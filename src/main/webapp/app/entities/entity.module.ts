import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LibraryAuthorModule } from './author/author.module';
import { LibraryBookModule } from './book/book.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LibraryAuthorModule,
        LibraryBookModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryEntityModule {}
