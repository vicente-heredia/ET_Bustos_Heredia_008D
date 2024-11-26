import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  selectedDay: string = 'lunes'; 

  constructor(private menuController: MenuController) {}

  ngOnInit() {}

  getDayName(day: string): string {
    const days: { [key: string]: string } = {
      lunes: 'Lunes',
      martes: 'Martes',
      miércoles: 'Miércoles',
      jueves: 'Jueves',
      viernes: 'Viernes'
    };
    return days[day] || 'Desconocido';
  }

  getClassesForDay(day: string): string[] {
    const schedule: { [key: string]: string[] } = {
      lunes: [
        'Programación - 001D - 09:00 AM- 11:30 AM (sala PC-222)',
        'Programación - 002D - 12:00 PM-14:30 PM (sala PC-207)'
      ],
      martes: [
        'Programación - 003D - 09:00 AM- 11:30 AM (sala PC-201)',
        'Programación - 004D - 12:00 PM-14:30 PM (sala PC-225)',
        'Portafolio - 013D - 4:00 PM (sala 200)'
      ],
      miércoles: [
        'Programación - 005D - 09:00 AM- 14:00 PM (sala PC-225)'
      ],
      jueves: [
        'Programación - 003D - 09:00 AM- 11:30 AM (sala PC-201)',
        'Programación - 004D - 12:00 PM-14:30 PM (sala PC-225)'
      ],
      viernes: [
        'Programación - 001D - 09:00 AM- 11:30 AM (sala PC-222)',
        'Programación - 002D - 12:00 PM-14:30 PM (sala PC-207)'
      ]
    };
    return schedule[day] || [];
  }

  isCurrentClass(classInfo: string): boolean {
    const now = new Date();
    const timeRegex = /(\d{2}:\d{2})\s?([AP]M)/g;
    const matches = classInfo.match(timeRegex);
    if (matches) {
      const [startTime, endTime] = matches.map(time =>
        new Date(`1970-01-01T${this.convertTo24Hour(time)}`)
      );
      return now >= startTime && now <= endTime;
    }
    return false;
  }

  convertTo24Hour(time: string): string {
    const [hour, minute, meridian] = time.match(/(\d{2}):(\d{2})\s?([AP]M)/)!.slice(1);
    const hours24 = meridian === 'PM' && hour !== '12' ? +hour + 12 : +hour;
    return `${hours24}:${minute}:00`;
  }

  mostrarMenu() {
    this.menuController.open('first');
  }
}
