// ==UserScript==
// @name        河海大学(常州)教务系统一键评教脚本
// @namespace   HHuc
// @version     1.0
// @description 在教师评教页面显示五个按钮，根据需要即可一键全选并填充评语（适用于常州校区，江宁和西康路校区的可以试试）
// @author      plusmultiply0
// @match       http://202.119.113.135/*
// @match       http://202.119.113.136/*
// @match       http://202.119.113.147/*
// @match       http://202.119.113.148/*
// @run-at      document-idle
// @grant       none
// @license     MIT License
// ==/UserScript==
function mainForJudge() {
    try {
        // functional
        const selectItem = (row, col) => {
            let path = `#tblView > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(${row}) > td > input[type=radio]:nth-child(${col})`;

            document.querySelector(path).setAttribute('checked', true);
        }

        const randomGernete = (num, base) => {
            return [1, 2, 3, 4, 5].map(() => Math.ceil(num + base * Math.random())).concat([1, 2, 3, 4, 5].map(() => Math.ceil(num + base * Math.random()))).slice(0, 6);
        }

        const result = (num, base) => {
            // clear exist
            let clearList = [...document.querySelectorAll("#tblView > tbody > tr > td:nth-child(2) > table > tbody input[type=radio]")];
            clearList.map((item) => item.removeAttribute('checked'));

            let newArr = randomGernete(num, base);
            for (let i = 0; i < 6; i++) {
                selectItem((2 + 3 * i), newArr[i]);
            }
            selectItem(20, 1);
            document.querySelector("body > form > table.fieldsettop > tbody > tr > td > table:nth-child(3) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td > textarea").value = "感谢老师这个学期的教学和指导";
        }

        const best = () => result(1, 0);
        const good = () => result(0, 3);
        const soso = () => result(1, 3);
        const notgood = () => result(2, 3);
        const bad = () => result(5, 0);

        const eventlist = [best, good, soso, notgood, bad];
        // UI
        const judge = ['非常好', '较好', '一般', '较差', '非常差'];
        let fragments = document.createDocumentFragment('div');
        let fragmentAll = document.createElement('div');

        fragmentAll.style = "display:flex;";
        const addElem = (text) =>{
            let div = document.createElement('div');
            let textnode = document.createTextNode(text);
            div.appendChild(textnode);
            div.style = 'border:1px solid #000;font:700 24px serif;';
            return div;
        }

        let nodes = judge.map((item => addElem(item)));
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].onclick = eventlist[i];
        }
        nodes.map((item) => fragmentAll.appendChild(item));
        fragments.appendChild(fragmentAll);

        document.querySelector("body > form > table.fieldsettop > tbody > tr > td > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr > td").appendChild(fragments);
    }
    catch (error) {
        // console.log(error);
        console.log('please use in right page!');
    }
}

mainForJudge();