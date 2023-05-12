window.addEventListener('load', function () 
{
    let formResetButton = document.getElementById("form-reset-button");
    let generateYmlButton = document.getElementById("generate-yml-button");

    formResetButton.addEventListener("click", function(){
        resetForm();
    });

    generateYmlButton.addEventListener("click", function(){
        let ymlData = {};
        downloadYmlFile(ymlData);
    });


    /**
     * 
     * @param {*} yml 
     */
    function downloadYmlFile(ymlData)
    {
        let selectedYmlParser = getSelectedYmlParserType();
        console.log(`TODO: Generate YML File`);
        console.log(`The selected parser is ${selectedYmlParser}`);
    }

    /**
     * 
     */
    function resetForm()
    {
        console.log("TODO: Reset selected form");
    }

    /**
     * 
     * @returns the selected YML parser as a string
     */
    function getSelectedYmlParserType()
    {
        let selectedYmlParser = document.getElementById("yml-parser-selecter");
        return ""+selectedYmlParser.value;
    }
});