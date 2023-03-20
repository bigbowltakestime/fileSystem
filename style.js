let body = window.document.body;

function tagCreate(tType,props){
  let element = document.createElement(tType);
  for(let i in props){
    element[i] = props[i];
  }
  return element;
};

function styleCreate(obj,styleOb){
  for(i in styleOb){
    obj.style[i] = styleOb[i];
  }
}
function title(borderColor){
  let titleWrap = tagCreate("div",{});
  styleCreate(titleWrap,{
    width : "500px",
    height : "100px",
    backgroundColor : "rgb(240, 240, 240)",
    border : `10px solid ${borderColor}`,
    borderRadius : "20px",
    margin : "auto",
    marginTop : "40px",

    display : "flex",
    flexDirection : "row",
    alignItems : "center",
    justifyContent : "space-between",
    padding : "20px",
    position : "relative",
    color : "black",
    fontSize : "20px",
    fontWeight : "600",

  });
  body.appendChild(titleWrap);

  return titleWrap;
}
let first = title("lightgray");
let second = title("rgb(100, 100, 100)");


first.innerText = "원하시는 동작을 선택하고 제출 버튼을 눌러주세요"
second.innerHTML += `
<form action="/edit" method="post" id="type">
<h2>이름을 지정해주세요</h2>
<input type="text" name = "filename">

<select name="typeselect" id = "typeselect" form="type">
<option value="none">확장명</option>
<option value="js">js</option>
<option value="py">py</option>
<option value="html">html</option>
<option value="css">css</option>
</select>



<select name="order" id = "selector" form="type">
<option value="none">목록</option>
<option value="add">생성</option>
<option value="delete">삭제</option>
</select>
<input type="submit">
</form>`

styleCreate(second,{
  fontSize : "15px",
})


