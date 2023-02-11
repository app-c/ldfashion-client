export interface Category {
   id?: string;
   data: string;
   type: [
      {
         colection: [
            {
               id: string;
               stok: number;
               title: string;
               amount: number;
               image: string;
            }
         ];
         id: string;
      }
   ];
}
