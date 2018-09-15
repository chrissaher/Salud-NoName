var sesion = (function () {
	return {
		nuevaSesion: function (idUsuario) {
			var nuevaSesion = {
				'idUsuario': idUsuario
			}
			window.localStorage.setItem('sesion', nuevaSesion);
		},
		obtenerSesion: function () {
			return window.localStorage.getItem('sesion');
		},
		verificarSesion: function() {
			return window.localStorage.getItem('sesion') !== null;
		},
		eliminarSesion: function() {
			window.localStorage.removeItem('sesion');
		}
	};
})();