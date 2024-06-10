import {SheetDefinition, registerSheet} from 'react-native-actions-sheet';
import actionSheet from '@/components/actionSheet';
 
registerSheet('actionSheet', actionSheet);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'actionSheet': SheetDefinition;
  }
}
 
export {};