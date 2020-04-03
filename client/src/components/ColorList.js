import React, { useState } from "react";
import axiosWithAuth from './Auth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorEdit, setColorEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorEdit.id}`, colorEdit)
      .then(res=>{
        updateColors(
          colors.map(c => c.id === res.data.id ? res.data : c)
        );
        setEditing(false);
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res=>{
        updateColors(colors.filter(c => c.id !== res.data))
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorEdit({ ...colorEdit, color: e.target.value })
              }
              value={colorEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorEdit({
                  ...colorEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
