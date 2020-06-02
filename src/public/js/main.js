$(document).ready(function () {
	(function () {
		const socket = io('/admin', { forceNew: false });
		let refrescarTiempo = function (params) {
			$(".server a").each(function () {
				socket.emit("myDate", $(this).data("date"), (data) => {
					$(this).find("small.time").text(data);
				});
			});
		}
		socket.on('pong', (param) => {
			refrescarTiempo();
		});
		socket.on("new message", (data) => {
			alert(data);
		});
		socket.on("yourId", (data) => {
			alert(data);
		})
		socket.on("server", (data) => {
			console.log(data);
			refrescarTiempo();
			$("body").find(".server").append(`
				<a href="#" class="list-group-item list-group-item-action ${socket.id == data.socketId ? "active" : ""}" data-date="${data.date}">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">${data.username} dice: </h5>
						<small class="time">${data.ahora}</small>
					</div>
					<p class="mb-1">${data.message}</p>
					<!-- <small>Donec id elit non mi porta.</small> -->
				</a>
			`);
			$(".server").animate({ scrollTop: $(".server").prop("scrollHeight") }, 1000);
		})
		socket.on("in", (data) => {
			alert(data)
		});
		const enviar = (params) => {
			console.log(socket)
			socket.emit("meId", socket.id, (data) => {
				alert(data);
			});
		}
		let identificacion = (params) => {
			return socket.id;
		}
		$("body").on("click", ".btnSolicitar", (e) => {
			e.preventDefault();
			enviar();
		});
		// $('#fromPruebas').formValidation(fromPruebas)
		// 	.on('success.form.fv', async function (e) {
		// 		e.preventDefault();
		// 		let formData = new FormData(this);
		// 		let $form = $(e.target);
		// 		let action = "/createParticipante";
		// 		let $button = $form.data('formValidation').getSubmitButton();
		// 		if ($button.hasClass("btn-update")) {
		// 			formData.append("par_id", localStorage.getItem("par_id"));
		// 			action = "/updateParticipante"
		// 		}
		// 		let param = {
		// 			form: $form,
		// 			formData: formData,
		// 			action,
		// 			loaderMsg: "Realizando cambios...!",
		// 			funcion: afterSave,
		// 			closeAlert: true
		// 		}
		// 		enviarPeticion(param)
		// 	});
		$("body").on("click", ".btnSave", (e) => {
			e.preventDefault();
			// console.log(socket)
			let data = {
				message: $("[name=message]").val(),
				username: $("[name=nombre]").val(),
				socketId: socket.id
			};
			fetch('/all', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (myJson) {
					// console.log(myJson);
				});
		});
	})();
});

// Notification.requestPermission().then(function (result) {
//   console.log(result);
// });

// function notifyMe(message = "Hi there") {
//   // Let's check if the browser supports notifications
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     var notification = new Notification(message);
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         var notification = new Notification(message);
//       }
//     });
//   }

//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them any more.
// }

// socket.on("new message", (data) => {
//   console.log(data);
//   notifyMe("New SMS received");
//   const messagesList = document.getElementById("messages");
//   const li = document.createElement("li");
//   li.className = "list-group-item list-group-item-warning list-group-item-action";

//   const body = document.createElement('p');
//   body.appendChild(document.createTextNode(data.Body));

//   data.From = data.From.replace(/[0-9]/g, 'x');
//   const from = document.createElement('span');
//   from.appendChild(document.createTextNode(data.From));

//   const _id = document.createElement('span');
//   _id.appendChild(document.createTextNode(data._id));
//   const createdAt = document.createElement('span');
//   createdAt.appendChild(document.createTextNode(data.createdAt));

//   li.appendChild(body);
//   li.appendChild(from);
//   li.appendChild(_id);
//   li.appendChild(createdAt);
//   messagesList.prepend(li);
// });
