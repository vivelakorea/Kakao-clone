const reply = document.querySelector(".reply");

const elt = (name, attributes, text) => {
  const node = document.createElement(name);
  if (attributes) {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  if (text) {
    const child = document.createTextNode(text);
    node.appendChild(child);
  }
  return node;
};

const setScroll = () => {
  const lastMsg = document.querySelector(".message-row:last-child");
  console.log(lastMsg.offsetTop);
  window.scrollTo(0, lastMsg.offsetTop - window.innerHeight + 100);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const now = new Date(),
    text = e.target.querySelector(".reply__column__text").value;
  if (text) {
    const msg = elt("div", { class: "message-row message-row--own" }),
      msgRow = elt("div", { class: "message-row__content" }),
      msgInfo = elt("div", { class: "message-row__info" }),
      msgContent = elt("span", { class: "message__bubble" }, text),
      msgTime = elt(
        "span",
        { class: "message__time" },
        `${now.getHours()}:${
          now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
        }`
      );
    msgInfo.appendChild(msgTime);
    msgInfo.appendChild(msgContent);
    msgRow.appendChild(msgInfo);
    msg.appendChild(msgRow);
    document.querySelector("main").appendChild(msg);

    e.target.querySelector(".reply__column__text").value = "";
    setScroll();
  }
};

const init = () => {
  reply.addEventListener("submit", handleSubmit);
};

init();
