var fs = require('fs');
var path = require('path');
var petPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var index = process.argv[3];

if (cmd === 'read') {
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    if ((index < 0) || (index >= data.length)) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    } else if (index == undefined){
      console.log(pets);
    } else {
      console.log(pets[index]);
  }
  });
}
else if (cmd === 'create') {
  fs.readFile(petPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    if (!pets) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if ((age == undefined) || (name == undefined) || (kind == undefined)){
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else if (parseInt(age) == NaN) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else {
      pets[pets.length] = {};
      pets[pets.length -1].age = parseInt(age);
      pets[pets.length -1].name  = name;
      pets[pets.length -1].kind = kind;
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pets);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
