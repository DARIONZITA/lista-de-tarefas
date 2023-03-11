import { useState, useEffect, useRef } from "react";
import React from "react";

export default function Nav(props) {
  let list =
    localStorage.getItem("categorias") === null
      ? []
      : localStorage.getItem("categorias").split(",");

  const uplist = useRef(list.length);
  const [change, setchange] = useState(Array(uplist.current).fill("button"));
  const [edit, setedit] = useState(list.reverse());
  const [edites, setedites] = useState("");
  const inputref = useRef([]);
  const essebtn = useRef();
  const nocss = useRef("noshow");
  const salvar = (e) => {
    if (edites === "" || edit.indexOf(edites) !== -1) {
      return false;
    }
    const list = localStorage.getItem("categorias");
    if (list === null) {
      localStorage.setItem("categorias", `${edites}`);
      setedit([edites]);
    } else {
      localStorage.setItem("categorias", `${list},${edites}`);
      setedit((prev) => {
        const list = [edites, ...prev];
        return list;
      });
    }
    setedites("");
    props.adicionar();
  };

  useEffect(() => {
    uplist.current = list.length;
    setchange(Array(uplist.current).fill("button"));
  }, [list.length]);

  const editar = (e, k) => {
    e.preventDefault();
    if (e.type === "blur" && e.target.type === "button") {
      return false;
    }
    setchange((prev) => {
      const nextprev = prev.map((value, index) => {
        return index === k ? (value === "text" ? "button" : "text") : value;
      });
      return nextprev;
    });
    const inverk = ((k - uplist.current - 1) ** 2) ** (1 / 2);
    console.log(inverk, k, change[k], edites);
    if (change[k] === "text") {
      if (edit[k] !== "" && list.indexOf(edit[k]) === -1) {
        list[k] = edit[k];
        localStorage.setItem("categorias", list.reverse());
      }
    }
    essebtn.current = e.target;
  };

  useEffect(() => {
    inputref.current.map(function (v, k) {
      if (v === essebtn.current && v.type === "text")
        v.selectionStart = v.value.length;
    });
  }, [change]);

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;
    setedit((prev) => prev.map((item, i) => (i === index ? newValue : item)));
  };

  return (
    <nav>
      {props.on === true && (
        <div id="input_edit">
          <button onClick={(e) => salvar(e)}></button>
          <input
            type="text"
            value={edites}
            onChange={(e) => setedites(e.target.value)}
            autoFocus
          />
        </div>
      )}
      {edit.map((v, k) => {
        return (
          <>
            <input
              key={k}
              type={change[k]}
              value={v}
              onBlur={(e) => editar(e, k)}
              onChange={(e) => handleInputChange(e, k)}
              onContextMenu={(e) => editar(e, k)}
              className="btn"
              ref={(btn) => (inputref.current[k] = btn)}
            />
            <button key={k} className={nocss.current}></button>
          </>
        );
      })}
    </nav>
  );
}
