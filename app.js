function copiarTexto() {
    const output = document.querySelector('.output');
    if (output.textContent.trim() !== "") {
        navigator.clipboard.writeText(output.textContent)
    } else {
        alert("No hay nada para copiar");
    }
}

function encriptar() {
    const textarea = document.querySelector('.traduccion_ingresar_texto');
    const output = document.querySelector('.output');
    const img = document.querySelector('.img');
    const noEncontrado = document.querySelectorAll('.no_encontrado, .no_encontrado_2');
    const btn_copiar = document.querySelector('.copiar');

    const texto = textarea.value.trim();
    const clave = 'palabraSecreta';
    if (texto) {
        const textoEncriptado = encriptarTexto(texto, clave);
        mostrarOutput(textoEncriptado, output, img, noEncontrado, btn_copiar);
    } else {
        mostrarOutput('', output, img, noEncontrado, btn_copiar);
    }
}

function desencriptar() {
    const textarea = document.querySelector('.traduccion_ingresar_texto');
    const output = document.querySelector('.output');
    const img = document.querySelector('.img');
    const noEncontrado = document.querySelectorAll('.no_encontrado, .no_encontrado_2');
    const btn_copiar = document.querySelector('.copiar');

    const textoEncriptado = textarea.value.trim();
    const clave = 'palabraSecreta';
    if (textoEncriptado) {
        const textoDesencriptado = desencriptarTexto(textoEncriptado, clave);
        mostrarOutput(textoDesencriptado, output, img, noEncontrado, btn_copiar);
    } else {
        mostrarOutput('', output, img, noEncontrado, btn_copiar);
    }
}

function encriptarTexto(texto, clave) {
    return CryptoJS.AES.encrypt(texto, clave).toString();
}

function desencriptarTexto(textoEncriptado, clave) {
    const bytes = CryptoJS.AES.decrypt(textoEncriptado, clave);
    return bytes.toString(CryptoJS.enc.Utf8);
}

function mostrarOutput(mensaje, output, img, noEncontrado, btn_copiar) {
    output.textContent = mensaje;
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    if (mensaje) {
        img.style.display = 'none';
        noEncontrado.forEach(el => el.style.display = 'none');
        btn_copiar.style.display = 'inline-block';
    } else {
        if (!isSmallScreen) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
        noEncontrado.forEach(el => el.style.display = 'block');
        btn_copiar.style.display = 'none';
    }
}

function handleResize() {
    const output = document.querySelector('.output');
    const img = document.querySelector('.img');
    const noEncontrado = document.querySelectorAll('.no_encontrado, .no_encontrado_2');
    const btn_copiar = document.querySelector('.copiar');

    const mensaje = output.textContent.trim();
    mostrarOutput(mensaje, output, img, noEncontrado, btn_copiar);
}

window.addEventListener('resize', handleResize);
