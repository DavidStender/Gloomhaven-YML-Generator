window.addEventListener('load', function () 
{
    let formResetButton = document.getElementById("form-reset-button");
    let generateYmlButton = document.getElementById("generate-yml-button");
    let ymlParserSelector = document.getElementById("yml-parser-selector");

    showSelectedParserForm(ymlParserSelector.value);

    formResetButton.addEventListener("click", function(){
        resetForm();
    });

    generateYmlButton.addEventListener("click", function(){
        let ymlData = {};
        downloadYmlFile(ymlData);
    });

    ymlParserSelector.addEventListener('change', function (){
        console.log(ymlParserSelector.value);
        showSelectedParserForm(ymlParserSelector.value);
    });

    /**
     * 
     * @param {String} parser - The currently selected YML parser
     */
    function showSelectedParserForm(parser)
    {
        let ymlForms = document.getElementsByClassName("yml-form");
        for(let i=0; i<ymlForms.length; i++)
        {
            let ymlForm = ymlForms[i];
            console.log(ymlForm.id);
            console.log(`yml-${parser}-generator-form`);
            if(ymlForm.id == `yml-${parser}-generator-form`)
            {
                console.log("class found");
                ymlForm.classList.remove("hidden");
            }
            else
            {
                ymlForm.classList.add("hidden");
            }
        }
    }


    /**
     * 
     * @param {*} yml 
     */
    function downloadYmlFile(ymlData)
    {
        console.log(`TODO: Generate YML File`);
        console.log(`The selected parser is ${ymlParserSelector.value}`);
        console.log(getCharacterYmlString());
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
     */
    function getCharacterYmlString(ymlCharacterData)
    {
        let characterYmlString = "";
        // Get all the input fields from parser form
        let characterID = document.getElementById("character-id-input").value;
        let characterLockey = document.getElementById("character-lockey-input").value;
        let characterModel = document.getElementById("character-model-input").value;
        let characterDefaultSkin = document.getElementById("character-default-skin-input").value;
        let characterHealthTable = [];
        for(let i=1; i<=9; i++)
        {
            let characterHealthTableLevelValue = document.getElementById(`character-health-table-input-level-${i}`).value;
            characterHealthTable.push(characterHealthTableLevelValue);
        }
        let characterNumberAbilityCards = document.getElementById("character-number-ability-cards-input").value;
        let characterAttackModDeck = document.getElementById("character-attack-mod-deck-input").value;
        let characterCompanionSummonData = document.getElementById("character-companion-summon-input").value;
        let characterDescription = document.getElementById("character-description-input").value;
        let characterRole = document.getElementById("character-role-input").value;
        let characterDifficulty = document.getElementById("character-difficulty=input").value;
        let characterStrengths = document.getElementById("character-strengths-input").value;
        let characterWeaknesses = document.getElementById("character-weaknesses-input").value;
        let characterAdventureDescription = document.getElementById("character-adventure-description-input").value;

        // Build the YML string
        characterYmlString = "Parser: Character\n";
        characterYmlString += `ID: ${characterID}\n`;
        characterYmlString += `Lockey: ${characterLockey}\n`;
        characterYmlString += `Model: ${characterModel}\n`;
        characterYmlString += `DefaultSkin: ${characterDefaultSkin}\n`;
        characterYmlString += `HealthTable: [${characterHealthTable[0]},${characterHealthTable[1]},${characterHealthTable[2]},${characterHealthTable[3]},${characterHealthTable[4]},${characterHealthTable[5]},${characterHealthTable[6]},${characterHealthTable[7]},${characterHealthTable[8]}]\n`;
        characterYmlString += `NumberAbilityCardsInBattle: ${characterNumberAbilityCards}\n`;
        characterYmlString += `AttackModifierDeck: ${characterAttackModDeck}\n`;
        characterYmlString += `CompanionSummonData: ${characterCompanionSummonData}\n`;
        characterYmlString += `Description: ${characterDescription}\n`;
        characterYmlString += `Role: ${characterRole}\n`;
        characterYmlString += `Difficulty: ${characterDifficulty}\n`;
        characterYmlString += `Strengths: ${characterStrengths}\n`;
        characterYmlString += `Weaknesses: ${characterWeaknesses}\n`;
        characterYmlString += `Adventure_Description: ${characterAdventureDescription}`;
        return characterYmlString;
    }
});