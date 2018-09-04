import { InjectionToken } from '@angular/core';
import * as hljs from 'highlightjs';
import * as Remarkable from 'remarkable';

export const REMARKABLE = new InjectionToken('remarkable');

export const remarkableFactory = () =>
  new Remarkable('full', {
    html: true,
    typographer: false,
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return '';
    }
  });
