var express = require('express');
var router = express.Router();
var ans = require("../model/ans")
const request = require('request')
use = {}
/* GET home page. */
router.post('/input', function (req, res, next) {
  count = 1
  max = 0
  const input = req.body.input
  console.log(input)
  ans.find({}, function (err, anss) {
    var userMap = {};
    // shuffle(anss)
    anss.forEach(function (user) {
        var acc = getSim(req.body.input, user.keyword)
        if (max < acc) {       
          max = acc
          use = {
            output: randomItem(user.output)
          }
        } else if (max == 0) {
          use = {
            output: "음.. 그 질문에 대한 답은 잘 모르겠네요.."
          }
        }
        if (count == anss.length) {
          console.log(use.output)
          res.status(200).json({
            status: 200,
            success: true,
            message: use.output
          })
        }
        count += 1
      }
      // const options = {
      //   uri: 'http://api.adams.ai/datamixiApi/sentsim?key=426293934795343218&sentence1='+encodeURI(input)+'&sentence2='+encodeURI(user.keyword),
      //   method: 'GET'
      // }
      // setTimeout(function() {
      //   request(options, function (error, response, body) {
      //     if (response.statusCode == 200) {
      //       var data = JSON.parse(body)
      //       console.log(body)

      // }, 3000);

    )
  })
})

//   mo(req.body.input).then(async syntax => {
//     var arr = []

//     await syntax.tokens.forEach(part => {
//       if (part.partOfSpeech.tag == "NOUN") {
//         arr.push(part.text.content)
//       }
//     });

//     return arr
//   }).then(arr => {
//     let findConditionLocalAns = {
//       keyword: arr
//     }
//     console.log(arr)
//     ans.findOne(findConditionLocalAns)
//     .exec(function (err, ans) {
//       if (err) {
//         res.status(500).json({
//           message: "server err" + err
//         })
//       } else if (ans) {
//         res.status(200).json({
//           message: "succes",
//           data: {
//             token: ans.output
//           }
//         })
//       } else if (!ans) {
//         res.status(200).json({
//           message: "succes",
//           data: {
//             token: '업삳'
//           }
//         })
//       }
//     })

//   })


//   })
//   // Creates a client

// async function mo(input) {
//   const language = require('@google-cloud/language');

// // Creates a client
// const client = new language.LanguageServiceClient();


// const text = input;

// // Prepares a document, representing the provided text
// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };
// // part.partOfSpeech
// // Detects syntax in the document
// const [syntax] = await client.analyzeSyntax({document});

// return syntax

// }

router.post('/', function (req, res, next) {
  const {
    keyword,
    output,
  } = req.body
  var arr = output.split(',');
  var ansModel = new ans()
  ansModel.keyword = keyword
  arr.forEach(function (ar) {
    ansModel.output.push(ar)
  })
  ansModel.save(function (err, newAns) {
    if (err) {
        res.status(500).json({
            status: 500,
            success: false,
          })
    }
    newAns.save(function (err, saveAns) {
      res.json({
        message: "저장 완료"
      })
    })
  })
})

function randomItem(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
}

function getSim(str1, str2) {

  var str1arr = str1.split(" ");
  var str2arr = str2.split(" ");
  var strarr_or = [];
  var strarr_and = [];
  var josa = ["가", "같이", "같이나", "같이는", "같이는야", "같이는커녕", "같이도", "같이만", "같인", "고", "과", "과는", "과는커녕", "과도", "과를", "과만", "과만은", "과의", "까지", "까지가", "까지나", "까지나마", "까지는", "까지는야", "까지는커녕", "까지도", "까지든지", "까지라고", "까지라고는", "까지라고만은", "까지라도", "까지로", "까지로나", "까지로나마", "까지로는", "까지로는야", "까지로는커녕", "까지로도", "까지로든", "까지로든지", "까지로라서", "까지로라야", "까지로만", "까지로만은", "까지로서", "까지로써", "까지를", "까지만", "까지만은", "까지만이라도", "까지야", "까지야말로", "까지에", "까지와", "까지의", "까지조차", "까지조차도", "까진", "께옵서", "께옵서는", "께옵서는야", "께옵서는커녕", "께옵서도", "께옵서만", "께옵서만은", "께옵서만이", "께옵선", "나", "나마", "는", "는야", "는커녕", "니", "다", "다가", "다가는", "다가도", "다간", "대로", "대로가", "대로는", "대로의", "더러", "더러는", "더러만은", "도", "든", "든지", "라", "라고", "라고까지", "라고까지는", "라고는", "라고만은", "라곤", "라도", "라든지", "라서", "라야", "라야만", "라오", "라지", "라지요", "랑", "랑은", "로고", "로구나", "로구려", "로구먼", "로군", "로군요", "로다", "로되", "로세", "를", "마다", "마다라도", "마다를", "마다에게", "마다의", "마따나", "마저", "마저나마라도", "마저도", "마저라도", "마저야", "만", "만도", "만에", "만으로", "만으로는", "만으로도", "만으로라도", "만으로써", "만으론", "만은", "만을", "만의", "만이", "만이라도", "만치", "만큼", "만큼도", "만큼만", "만큼씩", "만큼은", "만큼의", "만큼이나", "만큼이라도", "만큼이야", "말고", "말고는", "말고도", "며", "밖에", "밖에는", "밖에도", "밖엔", "보고", "보고는", "보고도", "보고만", "보고만은", "보고만이라도", "보곤", "보다", "보다는", "보다는야", "보다도", "보다만", "보다야", "보단", "부터", "부터가", "부터나마", "부터는", "부터도", "부터라도", "부터를", "부터만", "부터만은", "부터서는", "부터야말로", "부터의", "부턴", "아", "야", "야말로", "에", "에게", "에게가", "에게까지", "에게까지는", "에게까지는커녕", "에게까지도", "에게까지만", "에게까지만은", "에게나", "에게는", "에게는커녕", "에게다", "에게도", "에게든", "에게든지", "에게라도", "에게로", "에게로는", "에게마다", "에게만", "에게며", "에게보다", "에게보다는", "에게부터", "에게서", "에게서가", "에게서까지", "에게서나", "에게서는", "에게서도", "에게서든지", "에게서라도", "에게서만", "에게서보다", "에게서부터", "에게서야", "에게서와", "에게서의", "에게서처럼", "에게선", "에게야", "에게와", "에게의", "에게처럼", "에게하고", "에게하며", "에겐", "에까지", "에까지는", "에까지도", "에까지든지", "에까지라도", "에까지만", "에까지만은", "에까진", "에나", "에는", "에다", "에다가", "에다가는", "에다간", "에도", "에든", "에든지", "에라도", "에로", "에로의", "에를", "에만", "에만은", "에부터", "에서", "에서가", "에서까지", "에서까지도", "에서나", "에서나마", "에서는", "에서도", "에서든지", "에서라도", "에서만", "에서만도", "에서만이", "에서만큼", "에서만큼은", "에서보다", "에서부터", "에서부터는", "에서부터도", "에서부터라도", "에서부터만", "에서부터만은", "에서야", "에서와", "에서와는", "에서와의", "에서의", "에서조차", "에서처럼", "에선", "에야", "에의", "에조차도", "에하며", "엔", "엔들", "엘", "엘랑", "여", "와", "와는", "와도", "와라도", "와를", "와만", "와만은", "와에만", "와의", "와처럼", "와한테", "요", "으로", "으로가", "으로까지", "으로까지만은", "으로나", "으로나든지", "으로는", "으로도", "으로든지", "으로라도", "으로랑", "으로만", "으로만은", "으로부터", "으로부터는", "으로부터는커녕", "으로부터도", "으로부터만", "으로부터만은", "으로부터서는", "으로부터서도", "으로부터서만", "으로부터의", "으로서", "으로서가", "으로서나", "으로서는", "으로서도", "으로서든지", "으로서라도", "으로서만", "으로서만도", "으로서만은", "으로서야", "으로서의", "으로선", "으로써", "으로써나", "으로써는", "으로써라도", "으로써만", "으로써야", "으로야", "으로의", "으론", "은", "은커녕", "을", "의", "이", "이고", "이나", "이나마", "이니", "이다", "이든", "이든지", "이라", "이라고", "이라고는", "이라고도", "이라고만은", "이라곤", "이라는", "이라도", "이라든지", "이라서", "이라야", "이라야만", "이랑", "이랑은", "이며", "이며에게", "이며조차도", "이야", "이야말로", "이여", "인들", "인즉", "인즉슨", "일랑", "일랑은", "조차", "조차가", "조차도", "조차를", "조차의", "처럼", "처럼과", "처럼도", "처럼만", "처럼만은", "처럼은", "처럼이라도", "처럼이야", "치고", "치고는", "커녕", "커녕은", "커니와", "토록", "하", "하고", "하고가", "하고는", "하고는커녕", "하고도", "하고라도", "하고마저", "하고만", "하고만은", "하고야", "하고에게", "하고의", "하고조차", "하고조차도", "하곤", "해", "해서", "해줘", "들", "!", "?"];
  for (var i in str1arr) {
    str1arr[i] = str1arr[i].replace(/\.|\,| |\n|\t|\r/g, "");
    for (var j in josa) {
      if (str1arr[i].endsWith(josa[j])) str1arr[i] = str1arr[i].replace(josa[j], "");
    }
    if (strarr_or.indexOf(str1arr[i]) == -1) strarr_or.push(str1arr[i]);
  }

  for (var i in str2arr) {
    str2arr[i] = str2arr[i].replace(/\.|\,| |\n|\t|\r/g, "");
    for (var j in josa) {
      if (str2arr[i].endsWith(josa[j])) str2arr[i] = str2arr[i].replace(josa[j], "");
    }
    if (strarr_or.indexOf(str2arr[i]) == -1) strarr_or.push(str2arr[i]);
  }

  for (var i in str1arr) {
    for (var j in str2arr) {
      if (str1arr[i] == str2arr[j] && strarr_and.indexOf(str1arr[i]) == -1) strarr_and.push(str1arr[i]);
    }
  }

  function sorensen() {
    return (2 * strarr_and.length) / (str1arr.length + str2arr.length);
  }

  function jaccard() {
    return strarr_and.length / strarr_or.length;
  }

  function finalResult() {
    return (sorensen() + jaccard()) / 2;
  }
  return (finalResult());
}

module.exports = router;