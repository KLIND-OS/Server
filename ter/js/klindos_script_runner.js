function runKLINDOSScript(path) {
  var dots = path.split(".");
  if (dots[dots.length - 1] != "ks") {
    return Sandbox.model.addHistory({
      command: command,
      result: "This is not a ks file. Use only .ks file!",
    });
  } else {
    var content = parent.mainFileManager.getContent(path, "utf8");
    if (content == false) {
      return Sandbox.model.addHistory({
        command: command,
        result: "File " + path + " does not exist!",
      });
    } else {
      Sandbox.model.addHistory({
        command: command,
        result: "Starting .ks script...",
      });
      var result = content.split("\n");
      for (var i = 0; i < result.length; i++) {
        var scriptcom = result[i];
        if (scriptcom.indexOf("echo: ") == 0) {
          //echo
          var splited = scriptcom.split("\"")[1];
          this.model.addHistory({
            command: "",
            result: splited,
          });
        } else if (
          scriptcom.indexOf("::") == 0 ||
          scriptcom.replaceAll(" ", "") == ""
        ) {
          // This is a comment in the code. Just continue
          continue;
        } else if (scriptcom.indexOf("run:: ") == 0) {
          //run js
          var runcom = scriptcom.replace("run:: ", "");
          this.model.addHistory({
            command: "",
            result: eval(runcom),
          });
        } else if (scriptcom.indexOf("run: ") == 0) {
          //run js
          eval(scriptcom.replace("run: ", ""));
        } else {
          return this.model.addHistory({
            command: "",
            result: "Unknown command: " + scriptcom,
          });
        }
      }
      return true;
    }
  }
}
