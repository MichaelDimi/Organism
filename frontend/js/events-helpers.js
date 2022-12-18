function checkCellArrowHover() {
    if (organism.selected == null) return;

    // UP
    if (organism.selected.topArrow != null) {
        if (canvasPosX <= organism.selected.x+CELL_SIZE && canvasPosX >= organism.selected.x &&
            canvasPosY <= organism.selected.y && canvasPosY >= organism.selected.y-CELL_SIZE*(2/3)) {
            organism.selected.topArrow.setColor(DEFAULT_COLOR);
            document.body.style.cursor = "pointer";
            return;
        } else {
            organism.selected.topArrow.setColor(DEFAULT_COLOR_transparent);
        }
    }
    // DOWN
    if (organism.selected.bottomArrow != null) {
        if (canvasPosX <= organism.selected.x+CELL_SIZE && canvasPosX >= organism.selected.x &&
            canvasPosY >= organism.selected.y+CELL_SIZE && canvasPosY <= organism.selected.y+CELL_SIZE+CELL_SIZE*(2/3)) {
            organism.selected.bottomArrow.setColor(DEFAULT_COLOR);
            document.body.style.cursor = "pointer";
            return;
        } else {
            organism.selected.bottomArrow.setColor(DEFAULT_COLOR_transparent);
        }
    }
    // LEFT
    if (organism.selected.leftArrow != null) {
        if (canvasPosX <= organism.selected.x && canvasPosX >= organism.selected.x-CELL_SIZE*(2/3) &&
            canvasPosY >= organism.selected.y && canvasPosY <= organism.selected.y+CELL_SIZE) {
            organism.selected.leftArrow.setColor(DEFAULT_COLOR);
            document.body.style.cursor = "pointer";
            return;
        } else {
            organism.selected.leftArrow.setColor(DEFAULT_COLOR_transparent);
        }
    }
    // RIGHT
    if (organism.selected.rightArrow != null) {
        if (canvasPosX >= organism.selected.x+CELL_SIZE && canvasPosX <= organism.selected.x+CELL_SIZE+CELL_SIZE*(2/3) &&
            canvasPosY >= organism.selected.y && canvasPosY <= organism.selected.y+CELL_SIZE) {
            organism.selected.rightArrow.setColor(DEFAULT_COLOR);
            document.body.style.cursor = "pointer";
            return;
        } else {
            organism.selected.rightArrow.setColor(DEFAULT_COLOR_transparent);
        }
    }
}