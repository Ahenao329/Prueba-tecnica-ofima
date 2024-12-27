export const regExps: { [key: string]: RegExp } = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	number: /^[0-9]*$/,
	Telefono: /^[0-9]*$/,
	nit:/(^[0-9]+-{0,1}[0-9]{0,1})/, //123123123-9

};

export var errorMessages = {

	email: [
		{ type: 'required', message: 'El correo electrónico es requerido.' },
		{ type: 'pattern', message: 'El correo electrónico no es válido (ejemplo: username@domain.com).' }
	],
	password: [
		{ type: 'required', message: 'La contraseña es requerida.' },
		{ type: 'pattern', message: 'La contraseña no cumple con los criterios de seguridad.' }
	],
	Telefono: [
		{ type: 'required', message: 'Campo requerido.' },
		{ type: 'pattern', message: 'El campo debe ser un número entero.' },
		{ type: 'minlength', message: 'El teléfono debe tener mínimo 10 caracteres caracteres.' },
		{ type: 'maxlength', message: 'El teléfono debe tener máximo 10 caracteres caracteres.' },
	],
	Requerido: [
		{ type: 'required', message: 'Campo requerido.' }
	],
	RequeridoNumber: [
		{ type: 'required', message: 'Campo requerido.' },
		{ type: 'pattern', message: 'El campo debe ser un número entero.' }
	],
	Number: [
		{ type: 'pattern', message: 'El campo debe ser un número entero.' }
	],

	nit: [
		{ type: 'required', message: 'El NIT es requerido.' },
		{ type: 'pattern', message: 'El NIT no es válido (ejemplo: 123456789 ó 123456789-3)'}
	],
}