import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IBook } from 'app/shared/model/book.model';
import { BookService } from './book.service';
import { IAuthor } from 'app/shared/model/author.model';
import { AuthorService } from 'app/entities/author';

@Component({
    selector: 'jhi-book-update',
    templateUrl: './book-update.component.html'
})
export class BookUpdateComponent implements OnInit {
    book: IBook;
    isSaving: boolean;

    authors: IAuthor[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private bookService: BookService,
        private authorService: AuthorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ book }) => {
            this.book = book;
        });
        this.authorService.query().subscribe(
            (res: HttpResponse<IAuthor[]>) => {
                this.authors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.book.id !== undefined) {
            this.subscribeToSaveResponse(this.bookService.update(this.book));
        } else {
            this.subscribeToSaveResponse(this.bookService.create(this.book));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBook>>) {
        result.subscribe((res: HttpResponse<IBook>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAuthorById(index: number, item: IAuthor) {
        return item.id;
    }
}
