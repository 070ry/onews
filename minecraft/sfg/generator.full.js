function addLayer() {
  var layerDiv = document.createElement("div");
  layerDiv.classList.add("layer");

  var layerLabel = document.createElement("label");
  layerLabel.textContent =
    "Layer " + (document.getElementsByClassName("layer").length + 1);
  layerDiv.appendChild(layerLabel);

  var inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");

  var blockIdInput = document.createElement("input");
  blockIdInput.type = "text";
  blockIdInput.placeholder = "ブロックID";
  inputContainer.appendChild(blockIdInput);

  var blockDataInput = document.createElement("input");
  blockDataInput.type = "number";
  blockDataInput.placeholder = "ブロックのデータ値";
  inputContainer.appendChild(blockDataInput);

  var blockCountInput = document.createElement("input");
  blockCountInput.type = "number";
  blockCountInput.placeholder = "ブロックの厚さ";
  inputContainer.appendChild(blockCountInput);

  layerDiv.appendChild(inputContainer);

  var moveUpButton = document.createElement("button");
  moveUpButton.textContent = "↑";
  moveUpButton.onclick = function () {
    moveLayerUp(layerDiv);
    updateLayerLabels();
  };
  layerDiv.appendChild(moveUpButton);

  var moveDownButton = document.createElement("button");
  moveDownButton.textContent = "↓";
  moveDownButton.onclick = function () {
    moveLayerDown(layerDiv);
    updateLayerLabels();
  };
  layerDiv.appendChild(moveDownButton);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.onclick = function () {
    layerDiv.remove();
    updateLayerLabels();
  };
  layerDiv.appendChild(deleteButton);

  document.getElementById("layers").appendChild(layerDiv);
  updateLayerLabels();
}

function updateLayerLabels() {
  var layerDivs = document.getElementsByClassName("layer");
  for (var i = 0; i < layerDivs.length; i++) {
    layerDivs[i].querySelector("label").textContent = "Layer " + (i + 1);
  }
}

function moveLayerUp(layerDiv) {
  if (layerDiv.previousElementSibling) {
    layerDiv.parentNode.insertBefore(layerDiv, layerDiv.previousElementSibling);
  }
}

function moveLayerDown(layerDiv) {
  if (layerDiv.nextElementSibling) {
    layerDiv.parentNode.insertBefore(layerDiv.nextElementSibling, layerDiv);
  }
}
function generateSuperflatLayer() {
  var biomeId = document.getElementById("biome_id").value;

  var layers = [];
  var layerDivs = document.getElementsByClassName("layer");
  for (var i = 0; i < layerDivs.length; i++) {
    var blockId = layerDivs[i].querySelector("input[type='text']").value;
    var blockData = layerDivs[i].querySelector(
      "input[type='number']:nth-child(3)"
    ).value;
    var blockCount = layerDivs[i].querySelector(
      "input[type='number']:last-child"
    ).value;
    layers.push({
      block_data: parseInt(blockData),
      block_name: blockId,
      count: parseInt(blockCount),
    });
  }

  var inputData = {
    biome_name: parseInt(biomeId),
    block_layers: layers,
    encoding_version: 4,
    structure_options: null,
  };

  var outputElement = document.getElementById("output");
  var copyButtonElement = document.getElementById("copyButton");

  var sanitizedData = JSON.stringify(inputData, null, 0).replace(/\n/g, "");
  outputElement.textContent = sanitizedData;
  outputElement.classList.remove("hidden");
  copyButtonElement.classList.remove("hidden");
}

function copyGeneratedData() {
  var generatedDataElement = document.getElementById("output");
  if (generatedDataElement && generatedDataElement.textContent !== null) {
    navigator.clipboard
      .writeText(generatedDataElement.textContent)
      .then(function () {
        var popup = document.getElementById("popup");
        if (popup) {
          popup.style.display = "block";
          setTimeout(function () {
            popup.style.display = "none";
          }, 2000);
        }
      })
      .catch(function (err) {
        console.error("Failed to copy text: ", err);
      });
  }
}

/*
function copyGeneratedData() {
  var out = document.getElementById("output");
  navigator.clipboard.writeText(out.textContent);
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000);
}*/
