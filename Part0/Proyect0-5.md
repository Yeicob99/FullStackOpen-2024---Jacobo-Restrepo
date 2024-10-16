```mermaid
sequenceDiagram
    participant usuario
    participant navegador
    participant servidor

    usuario->>navegador: Navega a https://studies.cs.helsinki.fi/exampleapp/spa
    navegador->>servidor: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate servidor
    servidor-->>navegador: Documento HTML (cáscara SPA)
    deactivate servidor

    navegador->>servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate servidor
    servidor-->>navegador: Archivo CSS
    deactivate servidor

    navegador->>servidor: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate servidor
    servidor-->>navegador: Archivo JavaScript
    deactivate servidor  
    Note right of navegador: El navegador comienza a ejecutar el código JavaScript de la SPA
    navegador->>servidor: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate servidor
    servidor-->>navegador: [{ "content": "HTML es fácil", "date": "2023-1-1" }, ... ]
    deactivate servidor
    Note right of navegador: El navegador ejecuta la función callback que renderiza las notas en la spa '''