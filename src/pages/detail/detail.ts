import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotesService } from '../../services/notes.service';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  note = {id:null, title:null, description:null};
  id = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public notesService: NotesService) {
      this.id = navParams.get('id');
      if ( this.id != null ) {
        //this.note = notesService.getNote(this.id);
        notesService.getNote(this.id).subscribe(note => {
          this.note = note;
        });
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  addNote() {
    if ( this.note.id != null ) {
      // editando
      this.notesService.editNote(this.note);
      alert("Nota editada satisfactoriamente.");
    }
    else {
      this.note.id = Date.now();
      this.notesService.createNote(this.note);
      alert("Nota creada satisfactoriamente.");
    }
    this.navCtrl.pop();
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
    alert("Nota eliminada satisfactoriamente.");
    this.navCtrl.pop();
  }
}
