class aStarSearch {
    constructor(start, end, distFxn, heuristicFxn) {
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

    nodeWithMinF(set) {
        var minF = Infinity;
        var minElement = undefined;
        for (let element of set) {
            if (element.f < minF) {
                minElement = element;
                minF = element.f;
            }
        }
        return minElement;
    }

    update() {
        this.current = this.nodeWithMinF(this.openSet);
        if (this.current == end) {
            this.pathFound = true;
        }

        this.openSet.delete(this.current);
        this.closedSet.add(this.current);

        for (let neighbor of this.current.neighbors) {
            if (this.closedSet.has(neighbor)) {
                return;
            }
            if (!this.openSet.has(neighbor)) {
                this.openSet.add(neighbor);
            }

            var tempGScore = this.current.g + this.distFxn(this.current, neighbor);
            if (tempGScore >= neighbor.g) {
                return;
            }

            neighbor.previous = this.current;
            neighbor.g = tempGScore;
            neighbor.f = neighbor.g + this.heuristicFxn(neighbor, goal);
        }
    }

    run() {
        while (!this.openSet && !this.pathFound) {
            this.update();
        }
        return this.pathFound;
    }

    path() {
        var path = [this.current];
        var current = this.current;
        var previous = this.current.previous;
        while (previous.has(current)) {
            current = current.previous;
            path.push(current);
        }
        return path;
    }
}
