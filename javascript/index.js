window.addEventListener('load', function () 
{
    let formClearButton = document.getElementById("form-clear-button");
    let generateYmlButton = document.getElementById("generate-yml-button");
    let ymlParserSelector = document.getElementById("yml-parser-selector");
    let treasureTableSectionCount = 0;

    showSelectedParserForm(ymlParserSelector.value);

    ymlParserSelector.addEventListener('change', function (){
        showSelectedParserForm(ymlParserSelector.value);
    });

    formClearButton.addEventListener("click", function(){
        clearActiveForm(ymlParserSelector.value);
    });

    generateYmlButton.addEventListener("click", function(){
        if(ymlParserSelector.value === "hero-summon")
        {
            if(validateHeroSummonParserForm() === true)
            {
                let fileName = document.getElementById("hero-summon-name-input").value;
                let ymlDataString = createHeroSummonYmlString();
                downloadTextData(fileName, ymlDataString, ".yml");
            }
        }
        else if(ymlParserSelector.value === "character")
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
        else if(ymlParserSelector.value === "attack-modifier")
        {
            if(validateAttackModifierParserForm() === true)
            {
                let fileName = document.getElementById("attack-modifier-name-input").value;
                let ymlDataString = createAttackModifierYmlString();
                downloadTextData(fileName, ymlDataString, ".yml");
            }
        }
        else if(ymlParserSelector.value === "perk")
        {
            if(validatePerkParserForm() === true)
            {
                let perkFileName = document.getElementById("perk-file-name-input").value;
                let perkYmlDataString = createPerkYmlString();
                downloadTextData(perkFileName, perkYmlDataString, ".yml");
            }
        }
        else if(ymlParserSelector.value === "treasure-table")
        {
            let fileName = document.getElementById("treasure-table-file-name-input").value;
            let ymlDataString = createTreasureTableYmlString();
            downloadTextData(fileName, ymlDataString, ".yml");
        }
        else
        {
            console.log("TODO... generate YML file");
        }
    });

    /* PARSER FORMS INPUT LISTENERS */

    //HERO SUMMON
    document.getElementById("hero-summon-name-input").addEventListener("input", function(){
        if(this.value !== "")
        {
            if(this.parentElement.classList.contains("invalid-input"))
            {
                this.parentElement.classList.remove("invalid-input");
            }
            
            //TODO fix bug to clear errors on the other inputs

            document.getElementById("hero-summon-id-input").value = this.value+"ID";
            document.getElementById("hero-summon-lockey-input").value = `$${this.value}$`;
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
            document.getElementById("hero-summon-id-input").value = "";
            document.getElementById("hero-summon-lockey-input").value = "";
        }
    });

    document.getElementById("hero-summon-id-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("hero-summon-lockey-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("hero-summon-attack-amount-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("hero-summon-attack-range-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("hero-summon-move-amount-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("hero-summon-health-amount-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    //CHARACTER
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

    //ATTACK MODIFIER
    document.getElementById("attack-modifier-name-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("attack-modifier-math-modifier-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    //PERK
    document.getElementById("perk-file-name-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("perk-id-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("perk-name-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("perk-description-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    document.getElementById("perk-character-id-input").addEventListener("input", function(){
        if(this.value !== "" && this.parentElement.classList.contains("invalid-input"))
        {
            this.parentElement.classList.remove("invalid-input");
        }
        else if(this.value === "")
        {
            this.parentElement.classList.add("invalid-input");
        }
    });

    //Treasure Table
    document.getElementById("treasure-table-add-section-button").addEventListener("click", function(){
        let treasureTableSectionRewardCount = 0;
        console.log("TODO: add section");
        treasureTableSectionCount += 1;
        document.getElementById("treasure-table-sections").innerHTML += `
        <div class="treasure-table-section" id="treasure-table-section-${treasureTableSectionCount}">
            <div>
                <label id="treasure-table-section-name-label-${treasureTableSectionCount}" for="treasure-table-section-name-input-${treasureTableSectionCount}">Section Name:</label>
                <input id="treasure-table-section-name-input-${treasureTableSectionCount}" name="treasure-table-section-name-input-${treasureTableSectionCount}" type="text" />
            </div>
            <button class="treasure-table-buttons" id="treasure-table-add-reward-button-${treasureTableSectionCount}">Add Reward</button>
            <div id="treasure-table-section-${treasureTableSectionCount}-rewards"></div>
        </div>
        `;

        document.getElementById(`treasure-table-add-reward-button-${treasureTableSectionCount}`).addEventListener("click", function(){
            treasureTableSectionRewardCount += 1;
            console.log("adding reward");
            document.getElementById(`treasure-table-section-${treasureTableSectionCount}-rewards`).innerHTML += `
            <select class="treasure-table-reward-input">
                <option value="UnlockCharacter">Unlock Character</option>
            </select>
            <input class="treasure-table-reward-input" id="treasure-table-reward-input-${treasureTableSectionRewardCount}" name="treasure-table-file-name-input" type="text" />
            `;
        });
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
        if(parser === "hero-summon")
        {
            clearHeroSummonParserForm();
        }
        else if(parser === "character")
        {
            clearCharacterParserForm();
        }
        else if(parser === "attack-modifier")
        {
            clearAttackModifierParserForm();
        }
        else if(parser === "perk")
        {
            clearPerkParserForm();
        }
        else if(parser === "treasure-table")
        {
            clearTreasureTableParserForm();
        }
        else
        {
            console.log(`TODO: Clear ${parser} parser form...`);
        }
    }

    /**
     * 
     */
    function validateHeroSummonParserForm()
    {
        let heroSummonFormValid = true;

        //Check the "required" fields have a value
        let fileNameInput = document.getElementById("hero-summon-name-input");
        let heroSummonIdInput = document.getElementById("hero-summon-id-input");
        let heroSummonLockeyInput = document.getElementById("hero-summon-lockey-input");
        let heroSummonAttackAmount = document.getElementById("hero-summon-attack-amount-input");
        let heroSummonAttackRange = document.getElementById("hero-summon-attack-range-input");
        let heroSummonMoveAmount = document.getElementById("hero-summon-move-amount-input");
        let heroSummonHealthAmount = document.getElementById("hero-summon-health-amount-input");

        if(fileNameInput.value === "")
        {
            fileNameInput.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonIdInput.value === "")
        {
            heroSummonIdInput.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonLockeyInput.value === "")
        {
            heroSummonLockeyInput.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonAttackAmount.value === "")
        {
            heroSummonAttackAmount.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonAttackRange.value === "")
        {
            heroSummonAttackRange.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonMoveAmount.value === "")
        {
            heroSummonMoveAmount.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        else if(heroSummonHealthAmount.value === "")
        {
            heroSummonHealthAmount.parentElement.classList.add("invalid-input");
            heroSummonFormValid = false;
        }
        

        return heroSummonFormValid;
    }

    function createHeroSummonYmlString()
    {
        let heroSummonYmlString = "";
        let heroSummonID = document.getElementById("hero-summon-id-input").value;
        let heroSummonLockey = document.getElementById("hero-summon-lockey-input").value;
        let heroSummonModel = document.getElementById("hero-summon-model-input").value;
        let heroSummonAttackAmount = document.getElementById("hero-summon-attack-amount-input").value;
        let heroSummonAttackRange = document.getElementById("hero-summon-attack-range-input").value;
        let heroSummonMoveAmount = document.getElementById("hero-summon-move-amount-input").value;
        let heroSummonHealthAmount = document.getElementById("hero-summon-health-amount-input").value;
        let heroSummonShieldAmount = document.getElementById("hero-summon-shield-amount-input").value;
        let heroSummonRetaliateAmount = document.getElementById("hero-summon-retaliate-amount-input").value;
        let heroSummonAttackPierce = document.getElementById("hero-summon-attack-pierce-input").value;
        let heroSummonFlying = document.getElementById("hero-summon-flying-input").value;
        let heroSummonAttackAnimationOverload = document.getElementById("hero-summon-attack-animation-overload-input").value;
        let heroSummonOnAttackCondition = document.getElementById("hero-summon-on-attack-condition-input").value;

        heroSummonYmlString = "Parser: HeroSummon\n";
        heroSummonYmlString += `ID: ${heroSummonID}\n`;
        heroSummonYmlString += `Lockey: ${heroSummonLockey}\n`;
        heroSummonYmlString += `Model: ${heroSummonModel}\n`;
        heroSummonYmlString += `Attack: ${heroSummonAttackAmount}\n`;
        heroSummonYmlString += `Range: ${heroSummonAttackRange}\n`;
        heroSummonYmlString += `Move: ${heroSummonMoveAmount}\n`;
        heroSummonYmlString += `Health: ${heroSummonHealthAmount}\n`;
        if(heroSummonShieldAmount !== "" || heroSummonShieldAmount != "0")
        {
            heroSummonYmlString += `Shield: ${heroSummonShieldAmount}\n`;
        }
        if(heroSummonRetaliateAmount !== "" || heroSummonRetaliateAmount !== "0")
        {
            heroSummonYmlString += `Retaliate: ${heroSummonRetaliateAmount}\n`;
        }
        if(heroSummonAttackPierce !== "" || heroSummonAttackPierce !== "0")
        {
            heroSummonYmlString += `Pierce: ${heroSummonAttackPierce}\n`;
        }
        if(heroSummonFlying !== "" && heroSummonFlying !== "False")
        {
            heroSummonYmlString += `Flying: True\n`;
        }
        if(heroSummonAttackAnimationOverload !== "")
        {
            heroSummonYmlString += `AttackAnimOverload: ${heroSummonAttackAnimationOverload}\n`;
        }
        if(heroSummonOnAttackCondition !== "")
        {
            heroSummonYmlString += `OnAttackCondition: ${heroSummonOnAttackCondition}\n`;
        }

        return heroSummonYmlString;
    }

    function clearHeroSummonParserForm()
    {
        document.getElementById("hero-summon-name-input").value = "";
        document.getElementById("hero-summon-id-input").value = "";
        document.getElementById("hero-summon-lockey-input").value = "";
        document.getElementById("hero-summon-model-input").value = "PlagueRat";
        document.getElementById("hero-summon-attack-amount-input").value = "";
        document.getElementById("hero-summon-attack-range-input").value ="";
        document.getElementById("hero-summon-move-amount-input").value = "";
        document.getElementById("hero-summon-health-amount-input").value = "";
        document.getElementById("hero-summon-shield-amount-input").value = "";
        document.getElementById("hero-summon-retaliate-amount-input").value = "";
        document.getElementById("hero-summon-attack-pierce-input").value = "";
        document.getElementById("hero-summon-flying-input").value = "False";
        document.getElementById("hero-summon-attack-animation-overload-input").value = "";
        document.getElementById("hero-summon-on-attack-condition-input").value = "";
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

    function validateAttackModifierParserForm()
    {
        let attackModifierFormValid = true;

        //Check the "required" fields have a value
        let attackModifierNameInput = document.getElementById("attack-modifier-name-input");
        let attackModifierMathModifierInput = document.getElementById("attack-modifier-math-modifier-input");

        if(attackModifierNameInput.value === "")
        {
            attackModifierNameInput.parentElement.classList.add("invalid-input");
            attackModifierFormValid = false;
        }
        else if(attackModifierMathModifierInput.value === "")
        {
            attackModifierMathModifierInput.parentElement.classList.add("invalid-input");
            attackModifierFormValid = false;
        }

        return attackModifierFormValid;
    }

    function createAttackModifierYmlString()
    {
        let attackModifierYmlString = "";
        // Get all the input fields from parser form
        let attackModifierName = document.getElementById("attack-modifier-name-input").value;
        let attackModifierMathModifier = document.getElementById("attack-modifier-math-modifier-input").value;
        let attackModifierShuffle = document.getElementById("attack-modifier-shuffle-input").value;
        let attackModifierRolling = document.getElementById("attack-modifier-rolling-input").value;
        let attackModifierIsBless = document.getElementById("attack-modifier-is-bless-input").value;
        let attackModifierIsCurse = document.getElementById("attack-modifier-is-curse-input").value;
        let attackModifierAddTarget = document.getElementById("attack-modifier-add-target-input").value;
        let attackModifierInfuseAbility = document.getElementById("attack-modifier-infuse-ability-input").value;

        // Build the YML string
        attackModifierYmlString = "Parser: AttackModifier\n";
        attackModifierYmlString += `Name: ${attackModifierName}\n`;
        attackModifierYmlString += `MathModifier: "${attackModifierMathModifier}"\n`;
        if(attackModifierShuffle === "True")
        {
           attackModifierYmlString += `Shuffle: True\n`; 
        }
        if(attackModifierRolling === "True")
        {
            attackModifierYmlString += `Rolling: True\n`;
        }
        if(attackModifierIsBless === "True")
        {
            attackModifierYmlString += `IsBless: True\n`;
        }
        if(attackModifierIsCurse === "True")
        {
           attackModifierYmlString += `IsCurse: True\n`; 
        }
        if(attackModifierAddTarget === "True")
        {
            attackModifierYmlString += `AddTarget: True\n`;
        }
        if(attackModifierInfuseAbility !== "")
        {
            attackModifierYmlString += `Abilities:\n\tInfuseAbility:\n\t\tInfuse: [${attackModifierInfuseAbility}]`;
        }

        return attackModifierYmlString;
    }

    function clearAttackModifierParserForm()
    {
        document.getElementById("attack-modifier-name-input").value = "";
        document.getElementById("attack-modifier-math-modifier-input").value = "";
        document.getElementById("attack-modifier-shuffle-input").value = "False";
        document.getElementById("attack-modifier-rolling-input").value = "False";
        document.getElementById("attack-modifier-is-bless-input").value = "False";
        document.getElementById("attack-modifier-is-curse-input").value = "False";
        document.getElementById("attack-modifier-add-target-input").value = "False";
        document.getElementById("attack-modifier-infuse-ability-input").value = "";
    }


    function validatePerkParserForm()
    {
        let perkFormValid = true;
        let perkFileNameInput = document.getElementById("perk-file-name-input");
        let perkIdInput = document.getElementById("perk-id-input");
        let perkNameInput = document.getElementById("perk-name-input");
        let perkDescriptionInput = document.getElementById("perk-description-input");
        let perkCharacterIdInput = document.getElementById("perk-character-id-input");

        if(perkFileNameInput.value === "")
        {
            perkFileNameInput.parentElement.classList.add("invalid-input");
            perkFormValid = false;
        }
        else if(perkIdInput.value === "")
        {
            perkIdInput.parentElement.classList.add("invalid-input");
            perkFormValid = false;
        }
        else if(perkNameInput.value === "")
        {
            perkNameInput.parentElement.classList.add("invalid-input");
            perkFormValid = false;
        }
        else if(perkDescriptionInput.value === "")
        {
            perkDescriptionInput.parentElement.classList.add("invalid-input");
            perkFormValid = false;
        }
        else if(perkCharacterIdInput.value === "")
        {
            perkCharacterIdInput.parentElement.classList.add("invalid-input");
            perkFormValid = false;
        }

        return perkFormValid;
    }

    function createPerkYmlString()
    {
        let perkYmlString = "";
        // Get all the input fields from parser form
        let perkID = document.getElementById("perk-id-input").value;
        let perkName = document.getElementById("perk-name-input").value;
        let perkDescription = document.getElementById("perk-description-input").value;
        let perkCharacterID = document.getElementById("perk-character-id-input").value;
        let perkAvailable = document.getElementById("perk-available-input").value;
        let perkCardsToAdd = document.getElementById("perk-cards-to-add-input").value;
        let perkCardsToRemove = document.getElementById("perk-cards-to-remove-input").value;
        let perkIgnoreNegativeItemEffects = document.getElementById("perk-ignore-negative-item-effects-input").value;
        let perkIgnoreNegativeScenarioEffects = document.getElementById("perk-ignore-negative-scenario-effects-input").value;

        // Build the YML string
        perkYmlString = "Parser: Perk\n";
        perkYmlString += `ID: ${perkID}\n`;
        perkYmlString += `Name: ${perkName}\n`;
        perkYmlString += `Description: ${perkDescription}\n`;
        perkYmlString += `CharacterID: ${perkCharacterID}\n`;
        perkYmlString += `Available: ${perkAvailable}\n`;
        if(perkCardsToAdd !== "")
        {
           perkYmlString += `CardsToAdd: ${perkCardsToAdd}\n`; 
        }
        if(perkCardsToRemove !== "")
        {
            perkYmlString += `CardsToRemove: ${perkCardsToRemove}\n`;
        }
        if(perkIgnoreNegativeItemEffects === "True")
        {
           perkYmlString += `IgnoreNegativeItemEffects: ${perkIgnoreNegativeItemEffects}\n`; 
        }
        if(perkIgnoreNegativeScenarioEffects === "True")
        {
            perkYmlString += `IgnoreNegativeScenarioEffects: ${perkIgnoreNegativeScenarioEffects}`;
        }
        

        return perkYmlString;
    }

    function clearPerkParserForm()
    {
        document.getElementById("perk-file-name-input").value = "";
        document.getElementById("perk-id-input").value = "";
        document.getElementById("perk-name-input").value = "";
        document.getElementById("perk-description-input").value = "";
        document.getElementById("perk-character-id-input").value = "";
        document.getElementById("perk-available-input").value = "1";
        document.getElementById("perk-cards-to-add-input").value = "";
        document.getElementById("perk-cards-to-remove-input").value = "";
        document.getElementById("perk-ignore-negative-item-effects-input").value = "False";
        document.getElementById("perk-ignore-negative-scenario-effects-input").value = "False";
    }

    /**
     * 
     * @returns 
     */
    function createTreasureTableYmlString()
    {
        let treasureTableYmlString = "";

        // Build the YML string
        treasureTableYmlString = "Parser: TreasureTable\n";
        let treasureTableSectionsHtml = document.getElementsByClassName("treasure-table-section");
        for(let i=0; i<treasureTableSectionsHtml.length; i++)
        {
            let sectionName = treasureTableSectionsHtml[i].querySelector("input").value;
            treasureTableYmlString += `${sectionName}:\n`;

            let treasureTableSectionRewardInputs = treasureTableSectionsHtml[i].getElementsByClassName("treasure-table-reward-input");
            for(let j=0; j<treasureTableSectionRewardInputs.length; j+=2)
            {
                let rewardType = treasureTableSectionRewardInputs[j].value;
                let rewardValue = treasureTableSectionRewardInputs[j+1].value;
                treasureTableYmlString += `\t${rewardType}: ${rewardValue}\n`;
            }
        }
        
        return treasureTableYmlString;
    }

    /**
     * 
     */
    function clearTreasureTableParserForm()
    {
        document.getElementById("treasure-table-file-name-input").value = "";
        document.getElementById("treasure-table-sections").innerHTML = "";
    }
});