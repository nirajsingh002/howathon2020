

const speechRecognitionObject = () => {
  try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    console.log('test 1');
    return recognition;
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
  
  }  
}


let flow, currentFlowData, isDeafultRequired = true, loginFailed = true, setUserFlow = false;
  let reactDataObj = {};
  const data = {
    "login":  {
        "response": "Please provide your username and password",
        "getData" : ['username','password'],
        "nextSteps": {
          "username": "I didn't get your username",
          "password": "I didn't get your password",
          "empty": "Please provide your username and password",
          "wait": "Please wait while i fetch your Details",
          "faliure": "You have provided incorrect or invalid Username or password.",
          "success" : "Welcome #name, how may i help you today."
        }
    },
    'dashboard': {
      "response": "What would you like to show?",
      "getData": ['accountsummary', 'ministatement', 'fundtransfer', 'signout']

    },
    "default": {
      "response" : "Can you please repeat?"
    }
  };


const parseCommand = (transcriptArr) => {
  if (flow === "login") {
    transcriptArr.forEach((word,i) => {
      if (word === "") {
        return;
      }
      if (setUserFlow) {
        settingUserFlow(transcriptArr);
      }
      currentFlowData.getData.map(key => {
        const found = key.match(new RegExp(word, 'gi'));
        if (found && transcriptArr[i+1]) {
          reactDataObj[key] = transcriptArr[i+1];
          return;
        }
      });
    });
    let datakeys = Object.keys(reactDataObj);
    if (datakeys.length === 0) {
      readOutLoud(currentFlowData.nextSteps["empty"]);
    }
    else if (datakeys.indexOf('username') === -1) {
      readOutLoud(currentFlowData.nextSteps["username"]);
    }
    else if (datakeys.indexOf('password') === -1) {
      readOutLoud(currentFlowData.nextSteps["password"]);
    }
    else {
      readOutLoud(currentFlowData.nextSteps["wait"]);
      //Calling react component with data and flow
      console.log("reactDataObj",reactDataObj);
      var loginEvent = new CustomEvent('login', {detail: reactDataObj});
      // Dispatch the event.
      document.getElementsByTagName('body')[0].dispatchEvent(loginEvent);
      flow = '';
      /* if (loginFailed) {
        setTimeout(() => {
          readOutLoud(currentFlowData.nextSteps["faliure"]);
        }, 2000);
        loginFailed = false;
      } else {
        setTimeout(() => {
          readOutLoud(currentFlowData.nextSteps["success"]);
          setUserFlow = true;
        }, 2000);
      } */
    }
    return;
  } else if (flow === "dashboard") {
    reactDataObj = {};
    transcriptArr.forEach((word,i) => {
      if (word === "") {
        return;
      }
      if (setUserFlow) {
        settingUserFlow(transcriptArr);
      }
      currentFlowData.getData.map(key => {
        const found = key.match(new RegExp(word, 'gi'));
        if (found && transcriptArr[i+1]) {
          reactDataObj[key] = transcriptArr[i+1];
          return;
        }
      });
    });
    console.log('reactDataObj dashboard', reactDataObj);
    var dashboardEvent = new CustomEvent('dashboard', {detail: reactDataObj});
      // Dispatch the event.
      document.getElementsByTagName('body')[0].dispatchEvent(dashboardEvent);
      flow = '';
    // settingUserFlow(transcriptArr);
  } else {
    settingUserFlow(transcriptArr);
  }
  if (isDeafultRequired) {
    readOutLoud(data["default"].response);
  }
}

const settingUserFlow = (transcriptArr) => {
  transcriptArr.forEach(word => {
    if (word === "") {
      return;
    }
    Object.keys(data).map(key => {
      const found = key.match(new RegExp(word, 'gi'));
      if (found && data[key].response) {
        flow = key;
        currentFlowData = data[key];
        readOutLoud(data[key].response);
        isDeafultRequired = false;
      }
    }) 
  });
}

function readOutLoud(message) {
  var speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
  speech.text = message;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);

}

export const voiceStart = () => {
  
  
  const recognition = speechRecognitionObject()
  
  /*-----------------------------
        Voice Recognition 
  ------------------------------*/
  
  // If false, the recording will stop after a few seconds of silence.
  // When true, the silence period is longer (about 15 seconds),
  // allowing us to keep recording even when the user pauses. 
  recognition.continuous = true;
  
  // This block is called every time the Speech APi captures a line. 
  recognition.onresult = function(event) {
    console.log('test 2');
  
    // event is a SpeechRecognitionEvent object.
    // It holds all the lines we have captured so far. 
    // We only need the current one.
    var current = event.resultIndex;
  
    // Get a transcript of what was said.
    var transcript = event.results[current][0].transcript;
  
    // Add the current transcript to the contents of our Note.
    // There is a weird bug on mobile, where everything is repeated twice.
    // There is no official solution so far so we have to handle an edge case.
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
    if(!mobileRepeatBug) {
      parseCommand(transcript.split(' '));
    }
  };
  
  recognition.onstart = function() { 
    console.log('onStart')
  }
  
  recognition.onspeechend = function() {
    console.log('onspeechend')
    flow = '';
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      console.log('onerror');
    };
  }
  
  
  /*-----------------------------
        App buttons and input 
  ------------------------------*/
  
  console.log('triggered enable voice')
  recognition.start();
}