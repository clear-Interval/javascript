/* 
* areaDOm 幻灯片区域
* options 轮播图区域      
*/
function createBannerArea(areaDom, options) {
    let imgArea = document.createElement('div'),
        numberArea = document.createElement('div'),
        changeTimer = null,
        changeTime = 3000,
        domTimer = null,
        index = 0;

    initImgs();

    initNumbers();

    setStatus();

    autoChange();

    function initImgs() {
        imgArea.style.width = "100%";
        imgArea.style.width = "100%";
        imgArea.style.display = "flex";
        imgArea.style.overflow = "hidden";
        for (let i = 0; i < options.length; i++) {
            var obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.marginLeft = "0";
            imgArea.appendChild(img);
        }
        imgArea.addEventListener('mouseenter', () => {
            clearInterval(changeTimer);
            changeTimer = null;
        })
        imgArea.addEventListener('mouseleave', () => {
            autoChange();
        })
        areaDom.appendChild(imgArea);
    }

    function initNumbers() {
        numberArea.style.textAlign = "center";
        numberArea.style.marginTop = "-25px"
        for (let i = 0; i < options.length; i++) {
            var oSpan = document.createElement('span');
            oSpan.style.width = "12px";
            oSpan.style.height = "12px";
            oSpan.style.display = "inline-block";
            oSpan.style.background = "lightgray";
            oSpan.style.margin = "0 7px";
            oSpan.style.borderRadius = "50%";
            oSpan.style.cursor = "pointer";
            oSpan.addEventListener('click', () => {
                index = i;
                console.log(index);
                setStatus();
            })
            numberArea.appendChild(oSpan);
        }
        areaDom.appendChild(numberArea);
    }

    function setStatus() {
        for (let i = 0; i < numberArea.children.length; i++) {
            if (i === index) {
                numberArea.children[i].style.background = "#be926f";
            } else {
                numberArea.children[i].style.background = "lightgray";
            }
        }

        let start = parseInt(imgArea.children[0].style.marginLeft);
        let end = index * -100;
        let dis = end - start;
        let duration = 500;
        let speed = dis / duration;
        imgArea.children[0].style.marginLeft = end + '%';
        if (domTimer) {
            clearInterval(domTimer);
        }

        domTimer = setInterval(() => {
            start += speed * 20;
            imgArea.children[0].style.marginLeft = start + '%';
            if (Math.abs(end - start) < 1) {
                imgArea.children[0].style.marginLeft = end + '%';
                clearInterval(domTimer);
            }
        }, 20)

    }

    function autoChange() {
        if (changeTimer) {
            return;
        }
        changeTimer = setInterval(() => {
            if (index == options.length - 1) {
                index = 0;
                setStatus();
            } else {
                index++;
                setStatus();
            }
        }, changeTime)
    }

}
