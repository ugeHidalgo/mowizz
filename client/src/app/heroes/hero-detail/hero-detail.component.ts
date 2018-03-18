import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getHeroById();
  }

  getHeroById(): void {
    const me = this,
      id = this.route.snapshot.paramMap.get('id');

    me.heroService.getHeroById(id)
      .subscribe( hero => {
          me.toastr.info('Hero was successfully retrieved.');
          me.hero = hero[0];
      });
  }

  // Buttons methods

  onClickDeleteHero(): void {
    const me = this;

    me.heroService.deleteHero(me.hero)
      .subscribe( () => {
        me.toastr.success('Hero was successfully deleted.');
        me.location.back();
      });
  }

  onClickSaveHero(): void {
    const me = this;

    me.heroService.updateHero(me.hero)
      .subscribe( () => {
          me.toastr.success('Hero was successfully saved.', 'Saved!');
          me.location.back();
        }
      );
  }

  onClickGoBack() {
    this.location.back();
  }

}
