# Changelog

## v2.0.0

- [BreakingChange] exported the class definition of EventController and changed the default export
- dispose and remove now also null the callbacks so there's no lingering references to functions
- fixed the definition file attached to eventcontrol class for typescript definitions

## v1.1.3

- added more descriptive text to readme

## v1.1.2

- fixed typescript definition

## v1.1.1

- added typescript definition
- shortened add code slightly and added further detail to jsdoc

## v1.1.0

- eventcontrol.add now checks for the existence of a callback and prevents it being added twice
- eventcontrol.remove can break early as there is only a single reference to the same callback

## v1.0.1

- Minor correction to readme

## v1.0.0

- Initial vanilla js scripts uploaded
