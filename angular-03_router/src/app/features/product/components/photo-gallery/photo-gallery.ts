import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type Photo = {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

@Component({
  selector: 'app-photo-gallery',
  imports: [],
  templateUrl: './photo-gallery.html',
  styleUrl: './photo-gallery.scss'
})

export default class PhotoGallery {

  // Injection d'HttpClient
  private http = inject(HttpClient);

  // Signals pour gérer l'état
  photos = signal<Photo[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  // simule un like/unlike (photoId => count)
  likedPhotos = signal<number[]>([]); // ids des photos likées

  // compteur de like
  likeCounts = signal<{ [photoId: number]: number }>({});

  // Appel automatique au démarrage du composant
  ngOnInit() {
    this.loadPhotos();
  }

// Méthode pour charger les utilisateurs
  async loadPhotos() {
    try {
      this.isLoading.set(true);
      this.error.set(null);

      // Call HTTP avec l'Observable transformé en Promise
      const photos = await firstValueFrom(
        this.http.get<Photo[]>('https://picsum.photos/v2/list?page=1&limit=20')
      );
      // mise à jour du signal "users"
      this.photos.set(photos);

    } catch (err) {
      this.error.set('Erreur lors du chargement des photos');
      console.error('Erreur API:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Pour actualiser les données (pas optimisé mais nous verrons ça plus tard)
  async refresh() {
    await this.loadPhotos();
  }

  // Méthode toggleLike
  toggleLike(photoId: number) {
    const alreadyLiked = this.likedPhotos().includes(photoId);

    // Met à jour les ids likés
    this.likedPhotos.update(current =>
      alreadyLiked ? current.filter(id => id !== photoId) : [...current, photoId]
    );

    // Met à jour le compteur
    this.likeCounts.update(counts => {
      const prev = counts[photoId] || 0;
      return {
        ...counts,
        [photoId]: alreadyLiked ? Math.max(0, prev - 1) : prev + 1
      };
    });
  }
}
