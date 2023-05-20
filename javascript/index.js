window.addEventListener('load', function () 
{
    let formClearButton = document.getElementById("form-clear-button");
    let generateYmlButton = document.getElementById("generate-yml-button");
    let ymlParserSelector = document.getElementById("yml-parser-selector");

    showSelectedParserForm(ymlParserSelector.value);

    ymlParserSelector.addEventListener('change', function (){
        showSelectedParserForm(ymlParserSelector.value);
    });

    formClearButton.addEventListener("click", function(){
        clearActiveForm(ymlParserSelector.value);
    });

    generateYmlButton.addEventListener("click", function(){
        if(ymlParserSelector.value === "character")
        {
            if(validateCharacterParserForm() === true)
            {
                let fileName = document.getElementById("character-mercenary-name-input").value;
                let characterYmlDataString = createCharacterYmlString();
                let characterLangUpdate = createCharacterLangUpdate(fileName);
                downloadTextData(fileName, characterYmlDataString, ".yml");
                downloadTextData(`${fileName}LangUpdate`, characterLangUpdate, ".csv");
            }
        }
        else
        {
            console.log("TODO... generate YML file");
        }
    });

    /* PARSER FORMS INPUT LISTENERS */

    //Character
    document.getElementById("character-mercenary-name-input").addEventListener("input", function(){
        if(this.value !== "")
        {
            if(this.parentElement.classList.contains("invalid-input"))
            {
                this.parentElement.classList.remove("invalid-input");
            }
            
            //TODO fix bug to clear errors on the other inputs

            document.getElementById("character-id-input").value = this.value+"ID";
            document.getElementById("character-lockey-input").value = `$${this.value}$`;
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
            document.getElementById("character-id-input").value = "";
            document.getElementById("character-lockey-input").value = "";
        }
    });

    document.getElementById("character-id-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("character-lockey-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });


    //TODO: better validation for all the health table inputs
    for(let i=1; i<=9; i++)
    {
        document.getElementById(`character-health-table-input-level-${i}`).addEventListener("input", function(){
            if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
            {
                this.parentElement.classList.remove("invalid-input");
            }
            else if(this.value === "")
            {
                this.parentElement.classList.add("invalid-input");
            }
        });
    }

    document.getElementById("character-number-ability-cards-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    /* FUNCTIONS */

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
            if(ymlForm.id == `yml-${parser}-generator-form`)
            {
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
    function downloadTextData(fileName, textData, fileExtension)
    {
        const link = document.createElement("a");
        const file = new Blob([textData], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = fileName+fileExtension;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    /**
     * 
     */
    function clearActiveForm(parser)
    {
        if(parser === "character")
        {
            clearCharacterParserForm();
        }
        else
        {
            console.log(`TODO: Clear ${parser} parser form...`);
        }
    }

    function validateCharacterParserForm()
    {
        let characterFormValid = true;

        //Check the "required" fields have a value
        let fileNameInput = document.getElementById("character-mercenary-name-input");
        let characterIdInput = document.getElementById("character-id-input");
        let characterLockeyInput = document.getElementById("character-lockey-input");
        let characterHealthTable = [];
        for(let i=1; i<=9; i++)
        {
            let characterHealthTableLevelValue = document.getElementById(`character-health-table-input-level-${i}`).value;
            characterHealthTable.push(characterHealthTableLevelValue);
        }
        let characterNumberAbilityCardsInput = document.getElementById("character-number-ability-cards-input");

        if(fileNameInput.value === "")
        {
            fileNameInput.parentElement.classList.add("invalid-input");
            characterFormValid = false;
        }
        else if(characterIdInput.value === "")
        {
            characterIdInput.parentElement.classList.add("invalid-input");
            characterFormValid = false;
        }
        else if(characterLockeyInput.value === "")
        {
            characterLockeyInput.parentElement.classList.add("invalid-input");
            characterFormValid = false;
        }
        else if(characterHealthTable[0] === "" || characterHealthTable[1] === "" || characterHealthTable[2] === "" ||
                characterHealthTable[3] === "" ||characterHealthTable[4] === "" || characterHealthTable[5] === "" ||
                characterHealthTable[6] === "" || characterHealthTable[7] === "" || characterHealthTable[8] === "")
        {
            document.getElementById(`character-health-table-input-level-1`).parentElement.classList.add("invalid-input");
            characterFormValid = false;
        }
        else if(characterNumberAbilityCardsInput.value === "")
        {
            characterNumberAbilityCardsInput.parentElement.classList.add("invalid-input");
            characterFormValid = false;
        }

        return characterFormValid;
    }

    /**
     * 
     */
    function createCharacterYmlString()
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
        let characterDifficulty = document.getElementById("character-difficulty=input").value;

        // Build the YML string
        characterYmlString = "Parser: Character\n";
        characterYmlString += `ID: ${characterID}\n`;
        characterYmlString += `Lockey: ${characterLockey}\n`;
        characterYmlString += `Model: ${characterModel}\n`;
        characterYmlString += `DefaultSkin: ${characterDefaultSkin}\n`;
        characterYmlString += `HealthTable: [${characterHealthTable[0]},${characterHealthTable[1]},${characterHealthTable[2]},${characterHealthTable[3]},${characterHealthTable[4]},${characterHealthTable[5]},${characterHealthTable[6]},${characterHealthTable[7]},${characterHealthTable[8]}]\n`;
        characterYmlString += `NumberAbilityCardsInBattle: ${characterNumberAbilityCards}\n`;
        characterYmlString += `AttackModifierDeck: ${characterAttackModDeck}\n`;
        if(characterCompanionSummonData !== "")
        {
            characterYmlString += `CompanionSummonData: ${characterCompanionSummonData}\n`;
        }
        characterYmlString += `Difficulty: ${characterDifficulty}\n`;

        return characterYmlString;
    }

    function createCharacterLangUpdate(mercenaryName)
    {
        let characterLangUpdateString = "";
        let characterDescription = document.getElementById("character-description-input").value;
        let characterRole = document.getElementById("character-role-input").value;
        let characterStrengths = document.getElementById("character-strengths-input").value;
        let characterWeaknesses = document.getElementById("character-weaknesses-input").value;
        let characterAdventureDescription = document.getElementById("character-adventure-description-input").value;

        characterLangUpdateString +=    "Key,English [en-GB]\n"+
                                        `${mercenaryName},${mercenaryName}\n`+
                                        `${mercenaryName}_ROLE,${characterRole}\n`+
                                        `${mercenaryName}_DESCRIPTION,${characterDescription}\n`+
                                        `${mercenaryName}_STRENGTHS,${characterStrengths}\n`+
                                        `${mercenaryName}_WEAKNESSES,${characterWeaknesses}\n`+
                                        `${mercenaryName}_ADVENTURE_DESCRIPTION,${characterAdventureDescription}\n`;

        return characterLangUpdateString;
    }

    /**
     * 
     */
    function clearCharacterParserForm()
    {
        document.getElementById("character-mercenary-name-input").parentElement.classList.remove("invalid-input");
        document.getElementById("character-mercenary-name-input").value =  "";
        document.getElementById("character-id-input").parentElement.classList.remove("invalid-input");
        document.getElementById("character-id-input").value = "";
        document.getElementById("character-lockey-input").parentElement.classList.remove("invalid-input");;
        document.getElementById("character-lockey-input").value = "";
        document.getElementById("character-model-input").value = "brute";
        document.getElementById("character-default-skin-input").value = "0";
        document.getElementById(`character-health-table-input-level-1`).parentElement.classList.remove("invalid-input");
        for(let i=1; i<=9; i++)
        {
            document.getElementById(`character-health-table-input-level-${i}`).value = "";
        }
        document.getElementById("character-number-ability-cards-input").parentElement.classList.remove("invalid-input");
        document.getElementById("character-number-ability-cards-input").value = "";
        document.getElementById("character-attack-mod-deck-input").value = "Standard";
        document.getElementById("character-companion-summon-input").value = "";
        document.getElementById("character-description-input").value = "";
        document.getElementById("character-role-input").value = "";
        document.getElementById("character-difficulty=input").value = "low";
        document.getElementById("character-strengths-input").value = "";
        document.getElementById("character-weaknesses-input").value = "";
        document.getElementById("character-adventure-description-input").value = "";
    }
});