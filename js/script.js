//define the container
let container = document.querySelector(".container");

// define the message text area
let message = document.querySelector(".message");

// start  define the comments
let comments = [...document.querySelectorAll(".comment")];
let commentsImges = [...document.querySelectorAll(".peesonal-img")];
let commentsDuritions = [...document.querySelectorAll(".durition")];
let commentsNames = document.querySelectorAll(".name");
let commetnsParagraphs = document.querySelectorAll(".paragraph");
// end define the comments

//start replies
let replais = document.querySelectorAll(".replay");
let replaisImges = [...document.querySelectorAll(".replay-peesonal-img")];
let replaisDuritions = [...document.querySelectorAll(".replay-durition")];
let replaisNames = document.querySelectorAll(".replay-name");
let replaisParagraphs = document.querySelectorAll(".replay-paragraph");
//end replies

// define the send comment
let sendComment = document.querySelector(".send-comment");

//define the send img
let sendCommentImg = sendComment.querySelector("img");

//clone the sendComment
let clonedSendComment = sendComment.cloneNode(true);

//define the reply button
let repliesButtons = [...document.querySelectorAll("span.reply")];

// define the send button
let send = document.querySelector("button.send");

// start feth the json file

fetch("data.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let { comments, currentUser } = data;
    for (let i = 0; i < data.comments.length; i++) {
      commentsNames[i].textContent = comments[i].user.username;
      commentsImges[i].src = comments[i].user.image.png;
      commentsDuritions[i].textContent = comments[i].createdAt;
      commetnsParagraphs[i].textContent = comments[i].content;
    }
    for (let x = 0; x < comments[1].replies.length; x++) {
      replaisNames[x].textContent = comments[1].replies[x].user.username;
      replaisImges[x].src = comments[1].replies[x].user.image.png;
      replaisDuritions[x].textContent = comments[1].replies[x].createdAt;
      replaisParagraphs[x].textContent = comments[1].replies[x].content;
    }
    // add the img for the send comment
    sendCommentImg.src = currentUser.image.png;

    // same img for the clone version
    clonedSendComment.firstElementChild.src = currentUser.image.png;

    // style for the clone send comment
    clonedSendComment.lastElementChild.style.display = "none";

    clonedSendComment.style.flexDirection = "row";

    //creat the reply button for replaing on someone
    let rep = document.createElement("button");
    rep.classList.add("rep");
    rep.textContent = "REPLAY";

    // append the rep to the clonedelemnt

    clonedSendComment.appendChild(rep);
  });

// end feth the json file

// start behavior when click on replay button

// loop on the update buttons
repliesButtons.forEach((rep) => {
  rep.addEventListener("click", function () {
    clonedSendComment.style.display = "flex";

    //get the parent of the update button
    let parent = rep.closest(".box");

    // push the clonsend comment after the parent box
    parent.after(clonedSendComment);

    // focus on the text area when it is avalible
    clonedSendComment.querySelector("textarea").focus();

    //define the reply buttons
    let repbuttons = document.querySelectorAll("button.rep");

    // // push the replay when click on the reply button
    repbuttons.forEach((rep) => {
      rep.addEventListener("click", () => {
        pushReplayComment(rep);
        editon();
        // rating
        plusrate();
        substracurate();
      });

      // push the replay when click on enter
      clonedSendComment
        .querySelector("textarea")
        .addEventListener("keypress", (event) => {
          if (event.key === "Enter") {
            pushReplayComment(rep);
            editon();
            plusrate();
            substracurate();
          }
        });
    });
  });
});

// end behavior when click on replay button

//  start push reply function
function pushReplayComment(rep) {
  // define the clone of you comment
  let clonedYou = document.querySelector(".you").cloneNode(true);

  //define p

  let p = clonedYou.querySelector("p");

  clonedYou.classList.add("d-e");

  clonedYou.querySelector(".count").textContent = 0;

  clonedYou.querySelector(".replay-durition").textContent = `Now`;

  //define the text area and its value
  let textarea = clonedSendComment.querySelector("textarea");
  let textvlaue = textarea.value;

  // push the comment when the value is not emty
  if (textvlaue !== "") {
    //creat the mention

    let mention = document.createElement("span");
    mention.classList.add("mention");

    mention.textContent =
      "@" +
      rep.parentElement.previousSibling.querySelector("h4").textContent +
      " ";

    p.textContent = "";

    p.append(mention);

    p.append(textvlaue);

    rep.parentElement.after(clonedYou);

    clonedSendComment.remove();

    textarea.value = "";
  }
  //add delete function
  del();

  clonedYou.style.display = "flex";

  // defien the texts
  let texts = document.querySelectorAll(".text");

  //remove the message update message when make new comment or reply
  texts.forEach((text) => {
    if (text.querySelector(".message")) {
      text.lastChild.remove();
    }
  });
}
//  end push reply function

// start push a general comment when clikc on send

send.addEventListener("click", () => {
  if (message.value !== "") {
    pushRealComment();
    // editing
    editon();
    //rating
    plusrate();
    substracurate();
  }
});

// push real comment when click enter
document.querySelector(".message").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (message.value !== "") {
      pushRealComment();
      // editing
      editon();
      //rating
      plusrate();
      substracurate();
    }
  }
});

// start function that push real comment (not reply)
function pushRealComment() {
  // clone the comment for pushing a real comment
  let clonedComment = document.querySelector(".you").cloneNode(true);

  clonedComment.classList.add("able-d-e");

  //delete the reply class
  clonedComment.classList.remove("replay");

  // delete the duration
  clonedComment.querySelector(".replay-durition").textContent = "Now";

  //delete the rate span value
  clonedComment.querySelector(".count").textContent = 0;

  // add the message value to the paragraph in the comment
  clonedComment.querySelector("p").textContent = message.value;

  sendComment.before(clonedComment);

  message.value = "";

  //add delete function
  del();

  clonedComment.style.display = "flex";
}

del();

// start dalete behavior

function del() {
  let deletes = document.querySelectorAll(".delete");
  deletes.forEach((del) => {
    del.addEventListener("click", () => {
      // start creat the popup and the buttons for sure that you want to delete the comment

      //creat the popup div and add class
      let deletePopup = document.createElement("div");
      deletePopup.classList.add("deletePopup");

      //creat the elemnts

      //creat the h2 and add class and textContent
      let h2Delete = document.createElement("h2");
      h2Delete.classList.add("h2Delete");
      h2Delete.textContent = "Delete comment";

      // //creat the p and add class and textContent
      let pDelete = document.createElement("p");
      pDelete.classList.add("pDelete");
      pDelete.textContent =
        "Are you sure you want to delete this comment? this will remove the comment and can't be undone";

      // creat the buttonDiv
      let buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttonsDiv");

      //creat the buttons

      // create the cancel button
      let cancelButton = document.createElement("button");
      cancelButton.classList.add("cancelButton");
      cancelButton.textContent = "No,Cancel";

      // create the Yes button

      let yesButton = document.createElement("button");
      yesButton.classList.add("yesButton");
      yesButton.textContent = "Yes,Delete";

      //appen the buttons to the buttonsDiv
      buttonsDiv.append(cancelButton);
      buttonsDiv.append(yesButton);

      //appen all children to the deletePopup
      deletePopup.append(h2Delete);
      deletePopup.append(pDelete);
      deletePopup.append(buttonsDiv);

      //append the popup to the body

      document.body.append(deletePopup);

      overlay.style.zIndex = 10;

      //start delete cancel behavior
      cancelButton.addEventListener("click", () => {
        document.body.querySelectorAll(".deletePopup").forEach((e) => {
          e.remove();
        });

        overlay.style.zIndex = -1;
      });
      //end delete cancel behavior

      // start delete behavior
      yesButton.addEventListener("click", () => {
        overlay.style.zIndex = -1;

        document.body.querySelectorAll(".deletePopup").forEach((e) => {
          e.remove();
        });

        del.closest(".box").style.display = "none";
      });
      // end delete behavior

      // end creat the popup and the buttons for sure that you want to delete the comment
    });
  });
}

// end dalete behavior

// start edit fuction
function editon() {
  let edits = document.querySelectorAll(".edit");
  let clonedMeesage = message.cloneNode(true);
  clonedMeesage.classList.add("clonedMessage");
  edits.forEach((edit) => {
    edit.addEventListener("click", () => {
      let messages = document.querySelectorAll(".clonedMessage");

      //remove the messages when make onother reply
      messages.forEach((message) => {
        message.remove();
      });

      //defien the box
      let parent = edit.closest(".box");

      //define the text
      let text = parent.querySelector(".text");

      //define the p
      let p = edit.closest(".box").querySelector("p");

      // change its value

      clonedMeesage.value = p.textContent;

      // styking
      clonedMeesage.style.cssText = "margin-top:20px; width:100%;";

      //append the clonedMeesage to the text
      text.append(clonedMeesage);

      // creeat the update button

      let updateButton = document.createElement("button");
      updateButton.classList.add("updateButton");
      updateButton.textContent = "Update";

      let updateButtons = document.querySelectorAll(".updateButton");

      //remove the updateButtons when reply on another one
      updateButtons.forEach((but) => {
        but.remove();
      });

      // appen to the text

      text.append(updateButton);

      // start upadte comment or replay behavior
      updateButton.addEventListener("click", () => {
        update();
      });
      // end upadte comment or replay behavior

      clonedMeesage.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          p.textContent = clonedMeesage.value;
          update();
        }
      });

      function update() {
        if (clonedMeesage.value !== "") {
          // update the value of paragraoh
          p.textContent = clonedMeesage.value;

          //delete the update button and the cloneMessage when its updated
          clonedMeesage.remove();
          updateButton.remove();
        }
      }
    });
  });
  ///////////////////////////////////////////
}
editon();
// end edit fuction

// start rating the comments

function plusrate() {
  let pluses = document.querySelectorAll(".increment");
  pluses.forEach((plus) => {
    let mainContent = plus.nextElementSibling.textContent;
    plus.addEventListener("click", () => {
      // i have tried += but it did'nt work
      // +1 rate
      if (
        mainContent === plus.nextElementSibling.textContent ||
        mainContent > plus.nextElementSibling.textContent
      ) {
        plus.nextElementSibling.textContent =
          +plus.nextElementSibling.textContent + 1;
      }
    });
  });
}
plusrate();

function substracurate() {
  let substractes = document.querySelectorAll(".decrement");
  substractes.forEach((sub) => {
    let mainContent = sub.previousElementSibling.textContent;
    sub.addEventListener("click", () => {
      if (sub.previousElementSibling.textContent == 0) {
        return;
      }
      // -1 rate
      if (mainContent <= sub.previousElementSibling.textContent) {
        sub.previousElementSibling.textContent =
          +sub.previousElementSibling.textContent - 1;

        // sub.style.pointerEvents = "none";
      }
      // i have tried += but it doesnt work
    });
  });
}
substracurate();
// end rating the comments
