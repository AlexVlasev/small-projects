class aStarSearch {
    function constructor(start, end, distFxn, heuristicFxn) {
        this.start = start;
        this.end = end;
        // Requirements for this to work: the distance and heuristic functions
        // need to work with two nodes each.
        this.distFxn = distFxn;
        this.heuristicFxn = heuristicFxn;

        this.closedSet = new Set();
        this.openSet = new Set([start]);
        this.pathFound = false;
        this.current = undefined;
    }

    function nodeWithMinF(set) {
        var minF = Infinity;
        var minElement = undefined;
        for (element of set) {
            if (element.f < minF) {
                minElement = element;
                minF = element.f;
            }
        }
    }

    function update() {
        this.current = this.nodeWithMinF(openSet);
        if (this.current == end) {
            this.pathFound = true;
        }

        this.openSet.delete(this.current);
        this.closedSet.add(this.current);

        for (neighbor of this.current.neighbors) {
            if (this.closedSet.has(neighbor)) {
                return;
            }
            if (!this.openSet.has(neighbor)) {
                this.openSet.add(neighbor);
            }

            tempGScore = this.current.g + this.distFxn(this.current, neighbor);
            if (tempGScore >= neighbor.g) {
                return;
            }

            neighbor.previous = this.current;
            neighbor.g = tempGScore;
            neighbor.f = neighbor.g + this.heuristicFxn(neighbor, goal);
        }
    }

    function run() {
        while (!this.openSet && !this.pathFound) {
            this.update();
        }
        return this.pathFound;
    }

    function path() {
        path = [this.current];
        current = this.current;
        while (previous.has(current)) {
            current = current.previous;
            path.push(current);
        }
        return path;
    }
}
