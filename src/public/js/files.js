$(document).ready(function () {
    (function () {
        let url = "https://apps.iscorporacion.net/api/files/";
        let formUpload = document.getElementById("formUpload");
        const socket = io('/admin', { forceNew: false });
        let listObject = () => {
            fetch(url + "all", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    $("body").find(".server").empty();
                    myJson.forEach(function (content) {
                        $("body").find(".server").append(`
						<a href="#" class="list-group-item list-group-item-action fileItem" data-key="${content.key}">
							<div class="d-flex w-100 justify-content-between">
								<h5 class="mb-1 text-uppercase">${content.key}</h5>
                                <!-- <small class="time d-flex justify-content-end">${content.size}</small> -->
                                <div class="d-flex justify-content-end">
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary btnDownload" data-key="${content.key}"><i class="zmdi zmdi-cloud-download"></i></button>
                                        <button type="button" class="btn btn-danger btnDelete" data-key="${content.key}"><i class="zmdi zmdi-delete"></i></button>
                                    </div>
                                </div>
							</div>
							<!-- <p class="mb-1"></p> -->
							<small>${content.size}</small>
						</a>
					`);
                    });
                });
        }
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
        $("body").on("click", ".btnDelete", function (e) {
            e.preventDefault();
            let formData = new FormData();
            formData.append('key', $(this).data("key"));
            fetch(url + "delete", {
                method: 'DELETE',
                body: formData,
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        html: response.message,
                    })
                    listObject();
                });
        });
        $("body").on("click", ".btnDownload", function (e) {
            e.preventDefault();
            let formData = new FormData();
            formData.append('key', $(this).data("key"));
            axios.get(url + "download", {
                params: {
                    key: $(this).data("key")
                }
            }).then((response) => {
                let blob = new Blob([new Uint8Array(response.data.body.data).buffer]);
                saveAs(blob, response.config.params.key.split("/").pop());
            });
        });
        let setProgress = (value) => {
            $(".progress-bar").animate({
                width: `${value}%`
            }, 500);
        }
        formUpload.addEventListener("submit", function (e) {
            e.preventDefault();
            setProgress(0);
            let formData = new FormData(formUpload);
            axios.request({
                url: url + "upload",
                method: 'post',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (p) => {
                    let percentComplete = p.loaded / p.total;
                    setProgress(Math.floor(percentComplete * 100));
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
                    html: response.data.message,
                })
                listObject();
            })
        });
        listObject();
    })();
});