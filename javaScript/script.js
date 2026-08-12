document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript funcionando");


    //====================================
    // HEADER
    //====================================

    const header = document.querySelector("header");


    //====================================
    // BOTÓN WHATSAPP
    //====================================

    const whatsapp = document.querySelector(".whatsapp");

    if (whatsapp) {

        whatsapp.addEventListener("mouseenter", function () {

            whatsapp.style.transform = "scale(1.15)";

        });


        whatsapp.addEventListener("mouseleave", function () {

            whatsapp.style.transform = "scale(1)";

        });

    }


    //====================================
    // HEADER AL HACER SCROLL
    //====================================

    let ultimaPosicion = window.scrollY;


    window.addEventListener("scroll", function () {

        if (!header) {
            return;
        }


        const posicionActual = window.scrollY;


        // Si estamos arriba de todo
        if (posicionActual <= 10) {

            header.classList.remove("oculto");

        }


        // Si estamos bajando
        else if (posicionActual > ultimaPosicion) {

            header.classList.add("oculto");

        }


        // Si estamos subiendo
        else if (posicionActual < ultimaPosicion) {

            header.classList.remove("oculto");

        }


        ultimaPosicion = posicionActual;

    });


    //====================================
    // FORMULARIO
    //====================================

    const formulario = document.querySelector("#formulario");


    if (formulario) {

        const nombre = document.querySelector("#nombre");

        const telefono = document.querySelector("#telefono");

        const email = document.querySelector("#email");

        const asunto = document.querySelector("#asunto");

        const mensaje = document.querySelector("#mensaje");

        const mensajeFormulario =
            document.querySelector("#mensaje-formulario");


        //====================================
        // OCULTAR HEADER AL ENTRAR AL FORMULARIO
        //====================================

        formulario.addEventListener("focusin", function () {

            if (header) {

                header.classList.add("oculto");

            }

        });


        //====================================
        // MOSTRAR HEADER AL HACER CLICK AFUERA
        //====================================

        document.addEventListener("click", function (event) {

            if (
                header &&
                !formulario.contains(event.target)
            ) {

                header.classList.remove("oculto");

            }

        });


        //====================================
        // VALIDAR NOMBRE
        //====================================

        nombre.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^a-zA-ZÁÉÍÓÚáéíóúÑñ\s]/g,
                ""
            );

        });


        //====================================
        // VALIDAR TELÉFONO
        //====================================

        telefono.addEventListener("input", function () {

            this.value = this.value.replace(
                /[^0-9]/g,
                ""
            );

        });


        //====================================
        // ENVIAR FORMULARIO
        //====================================

        formulario.addEventListener("submit", async function (event) {

            event.preventDefault();


            //====================================
            // CAMPOS VACÍOS
            //====================================

            if (
                nombre.value.trim() === "" ||
                telefono.value.trim() === "" ||
                email.value.trim() === "" ||
                asunto.value.trim() === "" ||
                mensaje.value.trim() === ""
            ) {

                mensajeFormulario.innerHTML =
                    "⚠️ Por favor completá todos los campos.";

                mensajeFormulario.style.color = "red";

                return;

            }


            //====================================
            // VALIDAR EMAIL
            //====================================

            if (
                !email.value.includes("@") ||
                !email.value.includes(".")
            ) {

                mensajeFormulario.innerHTML =
                    "⚠️ Ingresá un correo electrónico válido.";

                mensajeFormulario.style.color = "red";

                return;

            }


            //====================================
            // ENVIAR A FORMSPREE
            //====================================

            const datos = new FormData(formulario);


            try {

                const respuesta = await fetch(
                    formulario.action,
                    {
                        method: "POST",
                        body: datos,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (respuesta.ok) {

                    mensajeFormulario.innerHTML =
                        "✅ Gracias por comunicarte con Miriam Pereyra. Tu consulta fue enviada correctamente.";

                    mensajeFormulario.style.color = "green";


                    formulario.reset();


                    // Mostrar nuevamente el header

                    if (header) {

                        header.classList.remove("oculto");

                    }

                } else {

                    mensajeFormulario.innerHTML =
                        "⚠️ No se pudo enviar la consulta. Intentá nuevamente.";

                    mensajeFormulario.style.color = "red";

                }


            } catch (error) {

                mensajeFormulario.innerHTML =
                    "⚠️ Ocurrió un error al enviar la consulta. Intentá nuevamente.";

                mensajeFormulario.style.color = "red";

            }

        });

    }

});