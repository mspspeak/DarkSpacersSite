/// <summary>
/// Enum for bonus rules.
/// </summary>
export enum BonusRule {
    /// <summary>
    /// No special ability score rule.
    /// </summary>
    None = "None",
    /// <summary>
    /// Rule to pick two stats to add a +1 to each.
    /// </summary>
    PickPlusTwoStats = "PickPlusTwoStats",
    /// <summary>
    /// Rule to add +2 to Strength, Dexterity, or Constitution.
    /// </summary>
    PlusTwoToStrDexOrCon = "PlusTwoToStrDexOrCon",
    /// <summary>
    /// Rule to add +2 to Dexterity, Wisdom, or Charisma.
    /// </summary>
    PlusTwoToDexWisOrCha = "PlusTwoToDexWisOrCha",
    /// <summary>
    /// Rule to add +2 to Intelligence.
    /// </summary>
    PlusTwoToIntOrPlusOneToExpertKnowledge   = "PlusTwoToIntOrPlusOneToExpertKnowledge",
    /// <summary>
    /// Rule to add +2 to Intelligence, Wisdom, or Constitution.
    /// </summary>
    PlusTwoToIntWisCon = "PlusTwoToIntWisCon",  
    /// <summary>
    /// Rule to add +2 to Dexterity, Intelligence, or Charisma.
    /// </summary>
    PlusTwoToDexIntCha = "PlusTwoToDexIntCha"
}