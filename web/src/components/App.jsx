import { useState } from "react";
import "../scss/App.scss";

function App() {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, como enviarlo a una API o mostrar un mensaje.
        console.log("Nuevo proyecto:", { projectName, description });
    };

    return (
        <div>
            <h1>Proyectos Molones</h1>
            <h2>Nuevo Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del proyecto:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Agregar Proyecto</button>
            </form>
        </div>
    );
}

export default App;
