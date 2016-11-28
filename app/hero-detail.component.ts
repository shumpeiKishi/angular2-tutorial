import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent extends OnInit {
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    super();
  }
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) =>
    this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack())
  }
  goBack(): void {
    this.location.back();
  }
  @Input()
  hero: Hero;
}