const remove = document.querySelector(".delete");
const right = document.querySelector(".right");
const add = document.querySelector(".plus-icon");
const notePad = document.querySelector(".notePad");
const titlesList = document.querySelector(".titles-list");
let titleISSelected = false;
let titles = JSON.parse(localStorage.getItem("titles")) || [];
let txtFiles = JSON.parse(localStorage.getItem("txtFiles")) || [];

add.addEventListener("click", addNote);
remove.addEventListener("click", () => {
  const index = parseInt(
    document.querySelector(".notePad").getAttribute("data-index")
  );
  if (Number.isNaN(index)) {
    return;
  }
  const popup = document.createElement("div");
  const delBtn = document.createElement("button");
  const cross = document.createElement("button");
  const message = document.createElement("h3");
  message.setAttribute("class", "message");
  message.innerText = `do you want to delete:- ${titles[index]}.txt`;
  popup.setAttribute("class", "popup");
  delBtn.setAttribute("class", "confirm-delete delete ");
  cross.setAttribute("class", "cross");
  delBtn.innerHTML = "Delete";
  cross.innerHTML = "X";
  right.appendChild(popup);
  popup.appendChild(delBtn);
  popup.appendChild(cross);
  popup.appendChild(message);
  const clearPopup = document.querySelector(".cross");
  clearPopup.addEventListener("click", closePopup);

  const confirmDel = document.querySelector(".confirm-delete");
  confirmDel.addEventListener("click", () => {
    if (titleISSelected) {
      const index = document
        .querySelector(".notePad")
        .getAttribute("data-index");
      titles.splice(index, 1);
      txtFiles.splice(index, 1);

      localStorage.setItem("titles", JSON.stringify(titles));
      localStorage.setItem("txtFiles", JSON.stringify(txtFiles));
      document.querySelector(".popup").remove();
      showtitles();
      const notePad1 = document.querySelector(".notePad");
      right.removeChild(notePad1);
      const notePad = document.createElement("div");
      notePad.setAttribute("data-index", "undefined");
      notePad.setAttribute("class", "notePad");
      right.prepend(notePad);
      titleISSelected = false;
    }
  });
});

function addNote() {
  const popup = document.createElement("div");
  const addBtn = document.createElement("button");
  const cross = document.createElement("button");
  const title = document.createElement("input");
  const heading = document.createElement("h3");
  popup.setAttribute("class", "popup");
  addBtn.setAttribute("class", "title-save");
  cross.setAttribute("class", "cross");
  title.setAttribute("class", "title");
  heading.setAttribute("class", "heading");
  addBtn.innerHTML = "Done";
  cross.innerHTML = "X";
  title.placeholder = "Please enter title";
  heading.innerHTML = "Title :";

  right.appendChild(popup);
  popup.appendChild(addBtn);
  popup.appendChild(cross);
  popup.appendChild(title);
  popup.appendChild(heading);
  const clearPopup = document.querySelector(".cross");
  clearPopup.addEventListener("click", closePopup);
  addBtn.addEventListener("click", addToLocal);
  title.focus();
}

function closePopup() {
  const popUp = document.querySelector(".popup");
  popUp.remove();
}

function addToLocal() {
  let title = document.querySelector(".title").value;
  if (title === "") {
    return;
  } else {
    titles.push(title);
    localStorage.setItem("titles", JSON.stringify(titles));
    document.querySelector(".popup").remove();
    showtitles();
  }
}

function showtitles() {
  titlesList.innerHTML = " ";
  const titles = JSON.parse(localStorage.getItem("titles"));
  titles.forEach((element, index) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-item");
    li.setAttribute("data-index", `${index}`);
    li.innerHTML = element;
    titlesList.appendChild(li);
  });
}
showtitles();

const title = document.querySelector("ul");
title.addEventListener("click", (e) => {
  document.querySelectorAll(".list-item").forEach((item) => {
    item.classList.remove("selected-title");
    titleISSelected = false;
  });
  if (e.target.classList.contains("list-item")) {
    e.target.classList.add("selected-title");
    titleISSelected = true;
  }
});

document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.classList.contains("list-item")) {
    const right = document.querySelector(".right");
    const notePad = document.querySelector(".notePad");
    right.removeChild(notePad);
    const div = document.createElement("div");
    div.setAttribute("class", "notePad");
    div.setAttribute("contenteditable", "true");
    div.setAttribute("data-index", `${e.target.getAttribute("data-index")}`);
    if (txtFiles[parseInt(e.target.getAttribute("data-index"))] === undefined) {
      div.innerText = "";
    } else {
      div.innerText = txtFiles[parseInt(e.target.getAttribute("data-index"))];
    }

    right.prepend(div);
    div.focus();
  }
});

document.querySelector(".clear").addEventListener("click", () => {
  const popup = document.createElement("div");
  const clearBtn = document.createElement("button");
  const cross = document.createElement("button");
  const message = document.createElement("h3");
  popup.setAttribute("class", "popup");
  clearBtn.setAttribute("class", "confirm-clear clear ");
  message.setAttribute("class", "message");
  cross.setAttribute("class", "cross");
  clearBtn.innerHTML = "Clear";
  cross.innerHTML = "X";
  let index = parseInt(
    document.querySelector(".notePad").getAttribute("data-index")
  );
  if (Number.isNaN(index)) {
    return;
  }

  message.innerText = `do you want to clear all text of:- ${titles[index]}.txt `;
  right.appendChild(popup);
  popup.appendChild(clearBtn);
  popup.appendChild(cross);
  popup.appendChild(message);
  const clearPopup = document.querySelector(".cross");
  clearPopup.addEventListener("click", closePopup);
  const notePad = document.querySelector(".notePad");
  clearBtn.addEventListener("click", () => {
    notePad.innerHTML = "";
    popup.remove();
  });
});

document.querySelector(".download").addEventListener("click", saveAsText);
function saveAsText() {
  if (titleISSelected) {
    let index = parseInt(
      document.querySelector(".notePad").getAttribute("data-index")
    );
    const text = document.querySelector(".notePad").innerText; // Get plain text
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `${titles[index]}.txt`; // File name
    link.click();

    URL.revokeObjectURL(link.href); // Clean up
    console.log(link);
  }
}
// const del = document.querySelector(".delete");
// del.addEventListener("click", () => {

// });

const savetxt = document
  .querySelector(".save")
  .addEventListener("click", () => {
    const index = parseInt(
      document.querySelector(".notePad").getAttribute("data-index")
    );
    const notePad = document.querySelector(".notePad");
    console.log(index);

    if (Number.isNaN(index)) {
      return;
    }
    txtFiles[index] = notePad.innerText;
    localStorage.setItem("txtFiles", JSON.stringify(txtFiles));
  });
