import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

declare const AOS: any;

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './cupones.component.html'
})
export class CuponesComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 600, once: true, offset: 0, startEvent: 'DOMContentLoaded' });
    }
    // Copy coupon code
    (window as any).copyCode = function(btn: HTMLElement) {
      const cardBody = btn.closest('.card-body');
      if (!cardBody) return;
      const codeEl = cardBody.querySelector('div[style*="Courier"]');
      if (!codeEl) return;
      const code = codeEl.textContent || '';
      navigator.clipboard.writeText(code.trim()).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2 me-1"></i>¡Copiado!';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-outline-dark');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-outline-dark');
        }, 2000);
      });
    };
  }
}
