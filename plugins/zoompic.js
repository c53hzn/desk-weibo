var styleContent = `
.zoomable {
	cursor: zoom-in;
}
#mask_layer {
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .5);
}
#mask_child {
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	margin: auto;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	cursor: zoom-out;
}
#mask_layer .arrow {
  position: absolute;
  top: 50%;
  left: 0px;
  right: 0px;
  width: 48px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 50px;
  vertical-align: top;
  background: rgba(0,0,0,0.5);
  transform: translateY(-25px);
  user-select: none;
  cursor: pointer;
}
#mask_layer .arrow:hover {
  opacity: 0.7;
}
#mask_layer .arrow-left {
  left: 0px;
  right: auto;
}
#mask_layer .arrow-right {
  left: auto;
  right: 0px;
}
.hidden {
	display: none;
}
.fade-in-anime {
	animation: fade-in 0.5s;
  	z-index: 2;
}
.fade-out-anime {
	animation: fade-out 0.5s;
	animation-fill-mode: forwards;
}
@keyframes fade-in {
  from {
  	opacity: 0;
  	z-index: 2;
  }
  to {
  	opacity: 1;
  	z-index: 2;
  }
}
@keyframes fade-out {
  0% {
  	opacity: 1;
  	z-index: 2;
  }
  99% {
  	opacity: 0;
  	z-index: 2;
  }
  100% {
  	opacity: 0;
  	z-index: -1;
  }
}
`;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
function zoompic(arr) {
	var d = document;
	var maskStyle = d.createElement("style");
	var maskDom = d.createElement("div");
	var imgObj = {};
	maskDom.id = "mask_layer";
	maskDom.className = "hidden";
	maskDom.innerHTML = `<div id="mask_child"></div><div class="arrow arrow-left">&lt;</div><div class="arrow arrow-right">&gt;</div>`;
	maskStyle.innerHTML = styleContent;
	d.querySelector("head").appendChild(maskStyle);
	d.querySelector("body").appendChild(maskDom);
	d.querySelector("#mask_child").onclick = function () {
		d.querySelector("#mask_layer").className = "fade-out-anime";
	};
	for (let j = 0; j < arr.length; j++) {
		let isElementArr = arr[j][2];
		if (!isElementArr) {
			zoom1(arr[j][0], arr[j][1], j);
		} else {
			let units = d.querySelectorAll(arr[j][0]);
			for (let m = 0; m < units.length; m++) {
				zoom2(units[m], arr[j][1], j + alphabet[m], arr[j][3]);
			}
		}
	}
	function zoom1(selector, isImg, groupIndex) {
		var nodes = d.querySelectorAll(selector);
		if (nodes.length < 2) {
			d.querySelector(".arrow.arrow-left").style.display = "none";
			d.querySelector(".arrow.arrow-right").style.display = "none";
		}
		for (let i = 0; i < nodes.length; i++) {
			let parent = nodes[i].parentNode;
			let grandParent = parent.parentNode;
			if (parent.nodeName != "A" && grandParent.nodeName != "A") {
				nodes[i].className = nodes[i].className + " zoomable";
				nodes[i].setAttribute("data-zoom-group-index", groupIndex + "-" + i);
				if (isImg) {
					imgObj[groupIndex + "-" + i] = nodes[i].src;
				} else {
					imgObj[groupIndex + "-" + i] = nodes[i].style.backgroundImage;
				}
				nodes[i].onclick = function () {
					d.querySelector(".arrow.arrow-left").setAttribute(
						"data-zoom-group-index",
						this.getAttribute("data-zoom-group-index")
					);
					d.querySelector(".arrow.arrow-right").setAttribute(
						"data-zoom-group-index",
						this.getAttribute("data-zoom-group-index")
					);
					if (isImg) {
						d.querySelector("#mask_child").style.backgroundImage =
							"url(" + this.src + ")";
					} else {
						d.querySelector(
							"#mask_child"
						).style.backgroundImage = this.style.backgroundImage;
					}
					d.querySelector("#mask_layer").className = "fade-in-anime";
				};
			}
		}
	}
	function zoom2(parentNode, isImg, groupIndex, childSelector) {
		var nodes = parentNode.querySelectorAll(childSelector);
		for (let i = 0; i < nodes.length; i++) {
			let parent = nodes[i].parentNode;
			let grandParent = parent.parentNode;
			if (parent.nodeName != "A" && grandParent.nodeName != "A") {
				nodes[i].className = nodes[i].className + " zoomable";
				nodes[i].setAttribute("data-zoom-group-index", groupIndex + "-" + i);
				if (isImg) {
					imgObj[groupIndex + "-" + i] = nodes[i].src;
				} else {
					imgObj[groupIndex + "-" + i] = nodes[i].style.backgroundImage;
				}
				nodes[i].onclick = function () {
					if (nodes.length < 2) {
						d.querySelector(".arrow.arrow-left").style.display = "none";
						d.querySelector(".arrow.arrow-right").style.display = "none";
					} else {
						d.querySelector(".arrow.arrow-left").style.display = "block";
						d.querySelector(".arrow.arrow-right").style.display = "block";
					}
					d.querySelector(".arrow.arrow-left").setAttribute(
						"data-zoom-group-index",
						this.getAttribute("data-zoom-group-index")
					);
					d.querySelector(".arrow.arrow-right").setAttribute(
						"data-zoom-group-index",
						this.getAttribute("data-zoom-group-index")
					);
					if (isImg) {
						d.querySelector("#mask_child").style.backgroundImage =
							"url(" + this.src + ")";
					} else {
						d.querySelector(
							"#mask_child"
						).style.backgroundImage = this.style.backgroundImage;
					}
					d.querySelector("#mask_layer").className = "fade-in-anime";
				};
			}
		}
	}
	d.querySelector(".arrow.arrow-left").onclick = function () {
		var indexStr = this.getAttribute("data-zoom-group-index");
		var indexArr = indexStr.split("-");
		if (imgObj[indexArr[0] + "-" + (indexArr[1] - 1)]) {
			d.querySelector("#mask_child").style.backgroundImage =
				"url(" + imgObj[indexArr[0] + "-" + (indexArr[1] - 1)] + ")";
			d.querySelector(".arrow.arrow-left").setAttribute(
				"data-zoom-group-index",
				indexArr[0] + "-" + (indexArr[1] - 1)
			);
			d.querySelector(".arrow.arrow-right").setAttribute(
				"data-zoom-group-index",
				indexArr[0] + "-" + (indexArr[1] - 1)
			);
		}
	};
	d.querySelector(".arrow.arrow-right").onclick = function () {
		var indexStr = this.getAttribute("data-zoom-group-index");
		var indexArr = indexStr.split("-");
		if (imgObj[indexArr[0] + "-" + (Number(indexArr[1]) + 1)]) {
			d.querySelector("#mask_child").style.backgroundImage =
				"url(" + imgObj[indexArr[0] + "-" + (Number(indexArr[1]) + 1)] + ")";
			d.querySelector(".arrow.arrow-left").setAttribute(
				"data-zoom-group-index",
				indexArr[0] + "-" + (Number(indexArr[1]) + 1)
			);
			d.querySelector(".arrow.arrow-right").setAttribute(
				"data-zoom-group-index",
				indexArr[0] + "-" + (Number(indexArr[1]) + 1)
			);
		}
	};
}
module.exports = zoompic;
