import React from 'react';
import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import { formatNumber } from 'common/format';

import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';

/*
 * Infernal Cinders -
 * Equip: Your melee attacks have a chance to deal an additional 82910 Fire damage. The critical strike chance of this damage is increased by 10% for each ally within 10 yds who bears this item.
 */
class InfernalCinders extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  damage = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasTrinket(ITEMS.INFERNAL_CINDERS.id);
  }

  on_byPlayer_damage(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.INFERNAL_CINDERS.id) {
      this.damage += event.amount;
    }
  }

  item() {
    return {
      item: ITEMS.INFERNAL_CINDERS,
      result: this.owner.formatItemDamageDone(this.damage),
    };
  }
}

export default InfernalCinders;
