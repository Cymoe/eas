/**
 * Profile interface for musician and band profiles in the app
 */
export interface Profile {
  id: string;
  name: string;
  type: 'band' | 'artist';
  location: string;
  distance: number;
  matchPercent: number;
  genres: string[];
  commonMatches: number;
  bio?: string;
  image: any; // Allow require() image source
  monthlyViews?: number;
}
