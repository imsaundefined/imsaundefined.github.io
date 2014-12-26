// Script-as-app template.
var submissionSSKey = "1MwsGs0Gk8kV7MouZ5IsolOZZd-aVDJwK-RNfYxj8cZ8";
var folderId = "0B_vROCev3947Qy1kN3Z2RUxOUU0";

function doGet(e) {
  /*var app = UiApp.createApplication().setTitle("Poster Service | Club Hub");
  var panel = app.createFormPanel();
  var grid = app.createGrid(7,2).setId('formGrid');
  
  var clubNameLabel = app.createHTML("<b>Name of your club:</b>");
  var clubNameBox = app.createTextBox().setWidth('150px').setName("clubname");
  
  var posterLabel = app.createHTML("<b>Title of your poster:</b>");
  var posterBox = app.createTextBox().setWidth('150px').setName("postertitle");
  
  var captionLabel = app.createHTML("<b>Caption for your poster:</b>");
  var captionBox = app.createTextArea().setWidth('300px').setName("postercaption");
  
  var dateLabel = app.createHTML("<b>Date of event:</b><br/>Your poster will automatically surface to the<br/>top of the page as the date of your event nears.");
  var dateBox = app.createDateBox().setWidth('150px').setName('date');

  var submitButton = app.createSubmitButton('<B>Submit</B>'); 
  var warning = app.createHTML("<B>Your poster is being uploaded...please don't close this page.<B>").setStyleAttribute('background','yellow').setVisible(false)
  //file upload
  var posterFileLabel = app.createHTML("<b>Image of your poster (PNG or JPG, please):</b>");
  var posterFileBox = (app.createFileUpload().setName('thefile'));

  //Grid layout of items on form
  grid.setWidget(0, 0, clubNameLabel)
      .setWidget(0, 1, clubNameBox)
      .setWidget(1, 0, posterLabel)
      .setWidget(1, 1, posterBox)
      .setWidget(2, 0, captionLabel)
      .setWidget(2, 1, captionBox)
      .setWidget(3, 0, dateLabel)
      .setWidget(3, 1, dateBox)
      .setWidget(4, 0, posterFileLabel)
      .setWidget(4, 1, posterFileBox)
      .setWidget(5, 0, submitButton)
      .setWidget(5, 1, warning)

  var cliHandler = app.createClientHandler().forTargets(warning).setVisible(true)
  submitButton.addClickHandler(cliHandler);  
  panel.add(grid);
  app.add(panel);
  return app;*/

  var page = HtmlService.createHtmlOutputFromFile('form.html');
  page.setTitle("Post-ed! Service | Club Hub");
  return page;
  
}

function processForm(formObject) {
  
  Logger.log("Got form.");
  
  var ClubName = formObject.clubname;
  var PosterTitle = formObject.postertitle;
  var PosterCaption = formObject.postercaption;
  var PosterDate = formObject.posterdate;
  var fileBlob = formObject.thefile;
  //Logger.log(fileBlob.getType());
  if(!(ClubName && PosterTitle && PosterCaption && PosterDate))
  {
    
    return "not full";
  }
  //else if( && fileBlob
  else
  {
    //Get submission time
    var d = new Date();
    var currentTime = d.toDateString()+d.toTimeString();
    var PosterID = d.getTime();
    
    var sheet = SpreadsheetApp.openById(submissionSSKey).getActiveSheet();
    var lastRow = sheet.getLastRow();
    var targetRange = sheet.getRange(lastRow+1, 1, 1, 6).setValues([[currentTime, ClubName,PosterTitle,PosterCaption,PosterDate,PosterID]]);
    
    // data returned is a blob for FileUpload widget
    var doc = DocsList.getFolderById(folderId).createFile(fileBlob).rename(PosterID);
    
    return "good";
  }

 }
