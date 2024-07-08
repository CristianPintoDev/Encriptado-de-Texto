// app.js

function copiarTexto() {
    const output = document.querySelector('.output');
    if (output.textContent.trim() !== "") {
        navigator.clipboard.writeText(output.textContent)
            .then(() => {
                alert("Texto copiado al portapapeles");
            })
            .catch(err => {
                console.error("Error al copiar el texto: ", err);
                alert("Error al copiar el texto");
            });
    } else {
        alert("No hay texto para copiar");
    }
}

function encriptar() {
    const textarea = document.querySelector('.traduccion_ingresar_texto');
    const output = document.querySelector('.output');
    const img = document.querySelector('.img');
    const noEncontradoElems = document.querySelectorAll('.no_encontrado');
    const copiarBtn = document.querySelector('.copiar');

    const texto = textarea.value.trim();
    const clave = 'mi_secreta_clave'; // Define una clave segura
    if (texto) {
        const textoEncriptado = encriptarTexto(texto, clave);
        mostrarOutput(textoEncriptado, output, img, noEncontradoElems, copiarBtn);
    } else {
        mostrarOutput('', output, img, noEncontradoElems, copiarBtn);
    }
}

function desencriptar() {
    const textarea = document.querySelector('.traduccion_ingresar_texto');
    const output = document.querySelector('.output');
    const img = document.querySelector('.img');
    const noEncontradoElems = document.querySelectorAll('.no_encontrado');
    const copiarBtn = document.querySelector('.copiar');

    const textoEncriptado = textarea.value.trim();
    const clave = 'mi_secreta_clave'; // Usa la misma clave
    if (textoEncriptado) {
        const textoDesencriptado = desencriptarTexto(textoEncriptado, clave);
        mostrarOutput(textoDesencriptado, output, img, noEncontradoElems, copiarBtn);
    } else {
        mostrarOutput('', output, img, noEncontradoElems, copiarBtn);
    }
}

function encriptarTexto(texto, clave) {
    return CryptoJS.AES.encrypt(texto, clave).toString();
}

function desencriptarTexto(textoEncriptado, clave) {
    const bytes = CryptoJS.AES.decrypt(textoEncriptado, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function mostrarOutput(mensaje, output, img, noEncontradoElems, copiarBtn) {
    output.textContent = mensaje;
    if (mensaje) {
        img.style.display = 'none';
        noEncontradoElems.forEach(el => el.style.display = 'none');
        copiarBtn.style.display = 'inline-block'; // Muestra el botón de copiar
    } else {
        img.style.display = 'block';
        noEncontradoElems.forEach(el => el.style.display = 'block');
        copiarBtn.style.display = 'none'; // Oculta el botón de copiar
    }
}
