import Axios from 'axios';

function DictionaryAPI() {
    let wordBreakdown = {};

    const requestWord = {
        method: 'GET',
        url: 'https://api.dictionaryapi.dev/api/v2/entries/en/example',
    };

    Axios.request(requestWord).then(function (response) {
        // had to do some logic as some words bring up multiple empty array entries
        // this only takes the sound clip url when the audio property contains a value
        for (let i = 0; i < response.data[0].phonetics.length; i++) {
            if (response.data[0].phonetics[i].audio) {
                wordBreakdown.phonetics = response.data[0].phonetics[i].audio;
            }
        }

        if (!wordBreakdown.phonetics) {
            wordBreakdown.phoneticsError = 'Sorry, there is no sound file available';
        }

        // remove when finished
        console.log(wordBreakdown);
        
    }).catch(function (error) {
        console.error(error);
    });

    return (
        <div></div>
    )
}



export default DictionaryAPI;