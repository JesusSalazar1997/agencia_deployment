import { Testimonial } from '../models/testimoniales.js';

const guardarTestimonial = async(req, res) => {
    // Validar campos no vacios
    const { nombre, correo, mensaje } = req.body;

    const errores = []
    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El nombre esta vacío' });
    }

    if (correo.trim() === '') {
        errores.push({ mensaje: 'El correo esta vacío' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'El mensaje esta vacío' });
    }
    if (errores.length > 0) {
        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();


        //Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en la base de datoss
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }

    }
}



export { guardarTestimonial };