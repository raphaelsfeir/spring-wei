import { Component, OnInit } from '@angular/core';
import {Actu, ActuService} from '../../../services/actu.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  loading = true;
  actu: Actu;

  constructor(private actuService: ActuService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.params.id;
    this.actuService.getActu(id).subscribe(actu => {
      this.loading = false;
      this.actu = actu;
    });
  }

}
