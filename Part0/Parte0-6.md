```mermaid
sequenceDiagram 
    participant usuario
    participant navegador
    participant servidor

    usuario->>navegador: Escribe nota y hace clic en Guardar
    Note right of navegador: El navegador captura la entrada del usuario y prepara para enviarla al servidor

    navegador->>servidor: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa con datos de la nota
    activate servidor
    Note right of servidor: El servidor recibe los datos de la nueva nota y la guarda
    servidor-->>navegador: { "content": "nueva nota", "date": "2024-5-30" }
    deactivate servidor

    Note right of navegador: El navegador actualiza la lista de notas dinámicamente sin recargar la página
    navegador->>navegador: Renderiza la nueva nota en la lista ```