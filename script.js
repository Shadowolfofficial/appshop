        function search_apps() {
          let input = document.getElementById('searchbar').value.toLowerCase();
          let x = document.getElementsByClassName('app-card');
          
          for (let i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
              x[i].style.display = "none";
            } else {
              x[i].style.display = "block";                 
            }
          }
        }

        function search_installapps() {
          let input = document.getElementById('searchbar').value.toLowerCase();
          let x = document.getElementsByClassName('install-apps');
          
          for (let i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
              x[i].style.display = "none";
            } else {
              x[i].style.display = "block";                 
            }
          }
        }

        function saveMainDataToFile() {
            var mainSaveData = {
                localStorage: btoa(JSON.stringify(Object.entries(localStorage))),
                cookies: btoa(document.cookie)
            };
            var encryptedData = CryptoJS.AES.encrypt(JSON.stringify(mainSaveData), "egamepass").toString();
            var blob = new Blob([encryptedData], { type: "application/octet-stream" });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "thundersaveapp.save";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
            alert("Data saved successfully!");
        }

        function restoreMainDataFromFile() {
            var fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = ".save";
            fileInput.style.display = "none";
            document.body.appendChild(fileInput);

            fileInput.addEventListener("change", function(event) {
                var file = event.target.files[0];
                var reader = new FileReader();

                reader.onload = function() {
                    var encryptedData = reader.result;
                    var decryptedData = CryptoJS.AES.decrypt(encryptedData, "egamepass").toString(CryptoJS.enc.Utf8);
                    var mainSaveData = JSON.parse(decryptedData);

                    var localStorageData = JSON.parse(atob(mainSaveData.localStorage));
                    for (var i = 0; i < localStorageData.length; i++) {
                        localStorage.setItem(localStorageData[i][0], localStorageData[i][1]);
                    }

                    document.cookie = atob(mainSaveData.cookies);
                    alert("Data restored successfully!");
                };

                reader.readAsText(file);
            });

            fileInput.click();
        }
