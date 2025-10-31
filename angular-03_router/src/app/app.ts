import { Component, signal } from '@angular/core';
import { Header } from "./core/components/header/header";
import { Footer } from "./core/components/footer/footer";
import { RouterOutlet } from '@angular/router';
import {ToastError} from './shared/components/toast-error/toast-error';
import {BannerError} from './shared/components/banner-error/banner-error';
import {GlobalSpinner} from './core/components/global-spinner';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterOutlet, ToastError, BannerError, GlobalSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
